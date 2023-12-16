import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetMonthlyDiary } from 'api/hook/useDiary';
import { AddIcon } from 'assets/home';
import { MonthlyDiaryRespose } from 'api/diaryApis';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
  const currentDate = useRecoilValue(CurrentDateState);
  const [arrayOfDays, setArrayOfDays] = useState<any>([]);
  const navigate = useNavigate();
  const [loggedDate, SetLoggedDate] =
    useState<Map<number, MonthlyDiaryRespose>>();

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  const { data: monthly } = useGetMonthlyDiary(currentDate.format('YYYY-MM'));

  useEffect(() => {
    getAllDays();
  }, [currentDate]);

  useEffect(() => {
    monthly &&
      SetLoggedDate(
        new Map(monthly.map((item) => [dayjs(item.updatedAt).date(), item]))
      );
  }, [monthly]);

  const onClickDate = (isLogged: boolean, id?: number, date?: string) => {
    if (isLogged) navigate(`/diary/${id}`);
    else navigate(`/write/${date}`);
  };

  const renderDays = () => {
    const dateFormat = 'dd';
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <WeekDay key={i}>{currentDate.weekday(i).format(dateFormat)}</WeekDay>
      );
    }
    return (
      <SingleWeekContainer className="days row">{days}</SingleWeekContainer>
    );
  };

  const getAllDays = () => {
    let firstDate = currentDate.startOf('month').weekday(0);
    const nextMonth = currentDate.add(1, 'month').month() + 1;

    let allDates = [];
    let weekDates = [];

    let weekCounter = 1;

    while (firstDate.weekday(0).toObject().months + 1 !== nextMonth) {
      const formated = formateDateObject(firstDate);

      weekDates.push(formated);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      firstDate = firstDate.add(1, 'day');
    }

    setArrayOfDays(allDates);
  };

  const renderCells = () => {
    const rows: any = [];
    let days: any = [];

    arrayOfDays.forEach((week: any, index: number) => {
      week.dates.forEach((d: any, i: number) => {
        const checkToday = () => {
          if (!d.isCurrentMonth) return 'hidden';
          else if (d.isCurrentDay) return 'today';
          else if (d.isFuture) return 'disabled';
        };

        const checkDiary = () => {
          if (loggedDate?.get(d.day)) return 'logged';
        };

        days.push(
          <DayContainer
            className={`${checkToday()} ${checkDiary()}`}
            onClick={() => {
              if (d.isCurrentMonth && !d.isFuture)
                onClickDate(
                  loggedDate?.get(d.day) !== undefined,
                  loggedDate?.get(d.day)?.id,
                  `${d.year}-${d.month}-${d.day}`
                );
            }}
            key={i}
          >
            <DailyEmotion>{d.isCurrentDay && <AddIcon />}</DailyEmotion>
            <DateNumber>{d.day}</DateNumber>
          </DayContainer>
        );
      });
      rows.push(<SingleWeekContainer key={index}>{days}</SingleWeekContainer>);
      days = [];
    });

    return <AllWeeksContainer>{rows}</AllWeeksContainer>;
  };

  const formateDateObject = (date: any) => {
    const clonedObject = { ...date.toObject() };

    const formatedObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentDate.month(),
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

const DateNumber = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 3px;
  border-radius: 4px;
`;

const DailyEmotion = styled.div`
  background-color: #d9d9d9;
  /* background: linear-gradient(to bottom, orange 50%, cyan); */

  width: 36px;
  height: 36px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayContainer = styled.div`
  flex-direction: column;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  color: #666666;
  gap: 4px;

  &.hidden {
    opacity: 0;
  }

  &.disabled {
    color: #bababa;
    & > ${DailyEmotion} {
      opacity: 0;
    }
  }

  &.today {
    & > ${DateNumber} {
      background-color: #ffffff;
      color: #000000;
    }
  }

  &.logged {
    cursor: pointer;

    & > ${DailyEmotion} {
      background: linear-gradient(red, blue);
    }
  }
`;

const WeekDay = styled(DayContainer)`
  padding-bottom: 8px;
  color: #000000;
`;

const SingleWeekContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(7, 1fr);
`;

const AllWeeksContainer = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
`;
