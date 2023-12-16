import Calendar from 'components/home/Calendar';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';

export default function Home() {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);
  const isCurrentMonth = dayjs().month() === currentDate.month();
  const isCurrnetYear = dayjs().year() === currentDate.year();
  const allMonthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const dateAdd = () => {
    const monthResult = currentDate.add(1, 'month');
    setCurrentDate(monthResult);
  };

  const dateSub = () => {
    const monthResult = currentDate.subtract(1, 'month');
    setCurrentDate(monthResult);
  };

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

  return (
    <>
      <div>
        월 조회하기
        <button onClick={yearSub}> ← </button>
        <button onClick={yearAdd} disabled={isCurrnetYear && true}>
          →
        </button>
        {currentDate.year()}년
        {allMonthes.map((map, index) => {
          return <div onClick={() => selectMonth(index)}>{map}월</div>;
        })}
      </div>
      <button onClick={dateSub}> ← </button>
      <button onClick={dateAdd} disabled={isCurrentMonth && true}>
        →
      </button>
      {currentDate.year()}년 {currentDate.month() + 1}월
      <Calendar />
    </>
  );
}
