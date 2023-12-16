import { CurrentDateState } from 'store/CurrentDateState';
import {
  DottedBorder,
  IconContainer,
  ModalProps,
  ModalTitle,
  MonthSelectModalContainer,
  Wrapper,
} from './MonthSelectModal';
import { useRecoilState } from 'recoil';
import locale from 'dayjs/locale/ko';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { ReactComponent as CloseModalIcon } from 'assets/dateSelect/closeModal.svg';
import { useEffect, useRef, useState } from 'react';

export default function DateSelectModal({ isOpen, closeFn }: ModalProps) {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);
  const [dateArray, setDateArray] = useState<Dayjs[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    makeDates();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const centerValueIndex = currentDate.date() - 1;
    const centerValueOffset = centerValueIndex * 50.59;
    const scrollPosition = centerValueOffset - containerWidth / 2 + 40.59;

    containerRef.current.scrollTo({
      top: 0,
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [isOpen, currentDate]);

  const checkSelect = (date: Dayjs) => {
    if (currentDate.isSame(date, 'day')) return true;
    else return false;
  };

  const onClickDate = (date: Dayjs) => {
    setCurrentDate(date.locale({ ...locale }));
  };

  const makeDates = () => {
    let dates = [];
    const now = dayjs().format('YYYY-MM-DD');
    const today = dayjs(new Date()).locale({ ...locale });
    const lastdayOfMonth = currentDate.endOf('month');

    // 출력 시작
    let startDate = currentDate.startOf('month');

    //출력 끝
    const endDate = currentDate.isSame(now, 'month')
      ? today.add(1, 'day')
      : lastdayOfMonth.add(1, 'day');

    let date = startDate;
    do {
      dates.push(date);
      date = date.add(1, 'day');
    } while (!date.isSame(endDate, 'day'));

    setDateArray(dates);
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <DateSelectModalContainer>
        <ModalTitle>
          작성 날짜 조회하기
          <IconContainer onClick={closeFn}>
            <CloseModalIcon />
          </IconContainer>
        </ModalTitle>
        <DottedBorder />
        <DateTitle>
          {currentDate.year()}년 {currentDate.month() + 1}월
        </DateTitle>
        <DateContainer ref={containerRef}>
          {dateArray.map((date, index) => {
            return (
              <SingleDate
                key={index}
                onClick={() => {
                  onClickDate(date);
                }}
                className={checkSelect(date) ? 'selected' : ''}
                ref={fixedContentRef}
              >
                {checkSelect(date) ? <SelectedDate /> : null}
                <div>{date.format('DD')}</div>
                <div>{date.format('dd')}</div>
              </SingleDate>
            );
          })}
        </DateContainer>
      </DateSelectModalContainer>
    </Wrapper>
  );
}

const SingleDate = styled.div`
  position: relative;
  display: flex;
  padding: 12px 13px;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666666;
`;

const DateContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 12px;
`;

const DateTitle = styled.div`
  display: flex;
  font-weight: 600;
  gap: 46px;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  margin: 8px 0px;
`;

const SelectedDate = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #e6e6e6;
  border-radius: 30px;
  z-index: -1;
`;

const DateSelectModalContainer = styled(MonthSelectModalContainer)``;
