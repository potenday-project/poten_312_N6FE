import dayjs from 'dayjs';
import locale from 'dayjs/locale/ko';
import { useRecoilValue } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Calendar() {
  const currentDate = useRecoilValue(CurrentDateState);
  const now = dayjs(currentDate.currentDate).locale({ ...locale });
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<any>([]);
  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  const renderDays = () => {
    const week = [];
    const dateFormat = 'dd';
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(<WeekDay key={i}>{now.weekday(i).format(dateFormat)}</WeekDay>);
    }
    return <WeekContainer className="days row">{days}</WeekContainer>;
  };

  const getAllDays = () => {
    let currentDate = currentMonth.startOf('month').weekday(0);
    const nextMonth = currentMonth.add(1, 'month').month();

    let allDates = [];
    let weekDates = [];

    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentDate);

      weekDates.push(formated);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, 'day');
    }

    setArrayOfDays(allDates);
  };

  const renderCells = () => {
    const rows: any = [];
    let days: any = [];

    arrayOfDays.forEach((week: any, index: number) => {
      week.dates.forEach((d: any, i: number) => {
        days.push(
          <DayContainer
            className={
              !d.isCurrentMonth
                ? 'hidden'
                : d.isCurrentDay
                ? 'today'
                : d.isFuture
                ? 'disabled'
                : ''
            }
            key={i}
          >
            <DateNumber>
              {/* {monthRecords && monthRecords[d.day - 1] && (
                <div
                  className={
                    Number(monthRecords[d.day - 1].total) === minMax?.min
                      ? 'min'
                      : Number(monthRecords[d.day - 1].total) === minMax?.max
                      ? 'max'
                      : ''
                  }
                />
              )} */}

              {d.day}
            </DateNumber>
            {/* {monthRecords && monthRecords[d.day - 1] && (
              <DateRecord
                className={
                  Number(monthRecords[d.day - 1].total) === 0
                    ? 'zero'
                    : Number(monthRecords[d.day - 1].total) === minMax?.min
                    ? 'min'
                    : Number(monthRecords[d.day - 1].total) === minMax?.max
                    ? 'max'
                    : ''
                }
              >
                {monthRecords &&
                  monthRecords[d.day - 1] &&
                  formatSecondsToHHMM(Number(monthRecords[d.day - 1].total))}
              </DateRecord>
            )} */}
          </DayContainer>
        );
      });
      rows.push(
        <WeekContainer className="row" key={index}>
          {days}
        </WeekContainer>
      );
      days = [];
    });

    return <div>{rows}</div>;
  };

  const formateDateObject = (date: any) => {
    const clonedObject = { ...date.toObject() };

    const formatedObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
      isFuture: date.isAfter(),
    };

    return formatedObject;
  };

  return (
    <CanlendarContainer>
      {renderDays()}
      {renderCells()}
    </CanlendarContainer>
  );
}

const CanlendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const DayContainer = styled.div`
  flex-direction: column;
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  padding-bottom: 28px;
  color: gray;

  &.hidden {
    opacity: 0;
  }

  &.disabled {
    margin-bottom: 50px;
    color: #bababa;
  }

  &.today {
    color: red;
  }
`;

const WeekDay = styled(DayContainer)`
  padding-bottom: 24px;
  color: gray;
`;

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DateNumber = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 28px;
    height: 28px;
    position: absolute;
    border-radius: 100px;
    z-index: -1;
  }

  & > div.min {
    background-color: orange;
  }

  & > div.max {
    background-color: mintcream;
  }
`;
