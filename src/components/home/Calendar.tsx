import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import { ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useGetMonthlyDiary } from 'api/hook/useDiary';
import { AddIcon } from 'assets/home';
import { useNavigate } from 'react-router-dom';
import locale from 'dayjs/locale/ko';
import { Emotion } from 'constants/enum';
import { colorByEmotion } from 'components/common/EmotionLabel';
import { DiaryResponse } from 'type/diaryResponse';
import { Date, DateFormat } from 'type/date';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);
  const [arrayOfDays, setArrayOfDays] = useState<Date[]>([]);
  const navigate = useNavigate();
  const [loggedDate, SetLoggedDate] = useState<Map<number, DiaryResponse>>();

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  const { data: monthly, isSuccess } = useGetMonthlyDiary(
    currentDate.format('YYYY-MM')
  );

  useEffect(() => {
    getAllDays();
  }, [currentDate]);

  const generateEmotionColor = (emotion: Emotion[] | undefined) => {
    if (!emotion) return '';
    let emotionResult = '';

    emotion.forEach((item: Emotion) => {
      emotionResult =
        emotionResult.length > 0
          ? emotionResult
              .concat(', ')
              .concat(colorByEmotion[`${item}`].indicator)
          : colorByEmotion[`${item}`].indicator;
    });

    return emotionResult;
  };

  useEffect(() => {
    monthly &&
      SetLoggedDate(
        new Map(
          monthly.map((item: DiaryResponse) => [
            dayjs(item.writingDay).date(),
            item,
          ])
        )
      );
  }, [monthly, isSuccess]);

  const onClickDate = (isLogged: boolean, id?: number, date?: string) => {
    if (isLogged) navigate(`/diary/${id}`);
    else {
      setCurrentDate(dayjs(date).locale({ ...locale }));
      navigate(`/write`);
    }
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
    // if (!loggedDate) return;
    let rows: ReactElement[] = [];
    let days: ReactElement[] = [];

    arrayOfDays.forEach((week, index: number) => {
      week.dates.forEach((d: any, i: number) => {
        const checkToday = () => {
          if (!d.isCurrentMonth) return 'hidden';
          else if (d.isCurrentDay) return 'today';
          else if (d.isFuture) return 'disabled';
        };

        const checkEmotionGradient = (emotion: Emotion[] | undefined) => {
          if (!emotion) return false;
          if (emotion.length > 1) return true;
          else return false;
        };

        const checkDiary = (
          loggedDate: Map<number, DiaryResponse> | undefined
        ) => {
          if (!loggedDate) return false;
          if (loggedDate.get(d.day)) return true;
          else return false;
        };

        days.push(
          <DayContainer
            isgradient={
              loggedDate
                ? checkEmotionGradient(loggedDate.get(d.day)?.emotion)
                : false
            }
            $emotioncolor={
              loggedDate
                ? generateEmotionColor(loggedDate.get(d.day)?.emotion)
                : ''
            }
            className={`${checkToday()}  ${
              loggedDate && loggedDate.get(d.day) ? 'logged' : ''
            }`}
            onClick={() => {
              if (d.isCurrentMonth && !d.isFuture)
                onClickDate(
                  loggedDate?.get(d.day) !== undefined,
                  loggedDate?.get(d.day)?.id,
                  `${d.year}-${d.month + 1}-${d.day}`
                );
            }}
            key={i}
          >
            <DailyEmotion>
              {d.isCurrentDay && !checkDiary(loggedDate) ? <AddIcon /> : null}
            </DailyEmotion>
            <DateNumber>{d.day}</DateNumber>
          </DayContainer>
        );
      });
      rows.push(<SingleWeekContainer key={index}>{days}</SingleWeekContainer>);
      days = [];
    });

    return <AllWeeksContainer>{rows}</AllWeeksContainer>;
  };

  const formateDateObject = (date: dayjs.Dayjs): DateFormat => {
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

  width: 36px;
  height: 36px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayContainer = styled.div<{
  $emotioncolor?: string;
  isgradient?: boolean;
}>`
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
      ${(props) =>
        props.isgradient
          ? css`
              background: linear-gradient(${props.$emotioncolor});
            `
          : css`
              background-color: ${props.$emotioncolor};
            `}
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
