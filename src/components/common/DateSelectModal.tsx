import { CurrentDateState } from 'store/CurrentDateState';
import { ModalProps } from './MonthSelectModal';
import { useRecoilState } from 'recoil';
import locale from 'dayjs/locale/ko';
import dayjs from 'dayjs';
import styled from 'styled-components';

export default function DateSelectModal({ isOpen, closeFn }: ModalProps) {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);

  const renderDates = () => {
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
      dates.push(
        <Container>
          날짜: {date.format('YYYY-MM-DD')} {date.format('dddd')}
        </Container>
      );

      date = date.add(1, 'day');
    } while (!date.isSame(endDate, 'day'));

    return dates;
  };

  renderDates();

  // startDate부터 endDate까지의 날짜와 요일 출력
  //   let currentDate = startDate;
  //   while (currentDate.isSameOrBefore(endDate, 'day')) {
  //     console.log(
  //       `날짜: ${currentDate.format('YYYY-MM-DD')}, 요일: ${currentDate.format(
  //         'dddd'
  //       )}`
  //     );
  //     currentDate = currentDate.add(1, 'day');
  //   }

  console.log(currentDate.date());
  return <> {renderDates()}</>;
}

const Container = styled.div`
  width: 300px;
  height: 300px;
`;
