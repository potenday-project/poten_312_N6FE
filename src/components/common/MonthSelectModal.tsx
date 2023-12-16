import { BackArrowIcon, NextArrowIcon } from 'assets/home';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import styled, { css } from 'styled-components';
import { ReactComponent as CloseModalIcon } from 'assets/dateSelect/closeModal.svg';
import { IconBtn } from 'pages/Home';

export interface ModalProps {
  isOpen: boolean;
  closeFn: () => void;
}

export interface ModalStyleProps {
  $isOpen: boolean;
}

export default function MonthSelectModal({ isOpen, closeFn }: ModalProps) {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);
  const isCurrnetYear = dayjs().year() === currentDate.year();
  const allMonthes = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];

  const yearSub = () => {
    const yearResult = currentDate.subtract(1, 'year');
    setCurrentDate(yearResult);
  };

  const yearAdd = () => {
    const yearResult = currentDate.add(1, 'year');
    setCurrentDate(yearResult);
  };

  const selectMonth = (month: number) => {
    setCurrentDate(currentDate.month(month));
  };

  const checkCurrent = (month: number) => {
    if (currentDate.month() === month - 1) return true;
    else return false;
  };

  const renderMonthes = () => {
    let monthes: any = [];
    allMonthes.forEach((quarter: number[]) => {
      quarter.forEach((month) => {
        monthes.push(
          <EachMonthContainer
            key={month}
            onClick={() => selectMonth(month - 1)}
            className={checkCurrent(month) ? 'current' : ''}
          >
            {checkCurrent(month) && <CurrentMonth />}
            {month}월
          </EachMonthContainer>
        );
      });
    });

    return <AllMonthContainer>{monthes}</AllMonthContainer>;
  };
  return (
    <Wrapper $isOpen={isOpen}>
      <MonthSelectModalContainer>
        <ModalTitle>
          월 조회하기
          <IconContainer onClick={closeFn}>
            <CloseModalIcon />
          </IconContainer>
        </ModalTitle>
        <DottedBorder />
        <YearCotainer>
          <IconBtn onClick={yearSub}>
            <BackArrowIcon />
          </IconBtn>
          {currentDate.year()}년
          <IconBtn onClick={yearAdd} disabled={isCurrnetYear && true}>
            <NextArrowIcon />
          </IconBtn>
        </YearCotainer>
        {renderMonthes()}
      </MonthSelectModalContainer>
    </Wrapper>
  );
}

export const Wrapper = styled.div<ModalStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;

  ${(props) =>
    !props.$isOpen &&
    css`
      display: none;
    `}
`;

export const IconContainer = styled.div`
  cursor: pointer;
  margin: 10px;
`;

export const MonthSelectModalContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 24px;
  color: #666666;
  position: absolute;
  z-index: 10;
  width: 327px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
`;

export const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DottedBorder = styled.div`
  border: 0px transparent;
  border-bottom: 2px #e6e6e6 dashed;
  margin-top: 8px;
`;

export const AllMonthContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 16px;
`;

export const EachMonthContainer = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &.current {
    color: #333333;
  }
`;

export const CurrentMonth = styled.div`
  position: absolute;
  z-index: -10;
  background-color: #fa9195;
  border-radius: 50%;
  filter: blur(2px);
  width: 100%;
  height: 100%;
`;

export const YearCotainer = styled.div`
  display: flex;
  font-weight: 600;
  gap: 46px;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  margin: 8px 0px;
`;
