import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import { ReactComponent as CancleIcon } from 'assets/write/cancel.svg';
import styled from 'styled-components';
import { DiaryDataState } from 'store/DiaryDataState';
import { ReactComponent as OpenModalIcon } from 'assets/dateSelect/openModal.svg';
import DateSelectModal from 'components/common/DateSelectModal';
import { useGetAnalytics, usePostDiary } from 'api/hook/useDiary';
import Flex from 'components/common/Flex';
import EmotionCheckbox from 'components/write/EmotionCheckbox';
import { useCheckbox } from 'utils/hooks/useCheckbox';
import book from 'assets/common/book.png';
import lollipop from 'assets/common/lollipop.png';
import gaze from 'assets/common/gaze.png';
import Button from 'components/common/Button';
import { getItem } from 'utils/localStorage';
import AnalyticsLoading from 'components/login/write/Loading';
import { DiaryAnalytics, DiaryContent, DiaryData } from 'type/diaryResponse';

export default function Write() {
  const [currentDate] = useRecoilState(CurrentDateState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [checkedEmotions, setCheckedEmotions] = useState<string[]>([]);
  const [diaryData, setDiaryData] = useRecoilState(DiaryDataState);
  const [diaryAnalytics, setDiaryAnalytics] = useState<DiaryAnalytics>();
  const [isWriting, setIsWriting] = useState(false);

  const userNickname = getItem('nickname');

  const navigate = useNavigate();

  const bookmarkCheckbox = useCheckbox();
  const contentRef = useRef(null);
  const getAnalyticsMutation = useGetAnalytics();
  const createDiaryMutation = usePostDiary();

  const onAnalyzeButtonClick = () => {
    getAnalyticsMutation.mutate(
      { content: diaryData.content },
      {
        onSuccess: (data) => {
          setStep(2);
          setDiaryAnalytics(data);
        },
      }
    );
  };

  const onAddButtonClick = () => {
    if (createDiaryMutation.isPending || !diaryAnalytics) return;

    createDiaryMutation.mutate(
      {
        content: diaryData.content,
        emotion: checkedEmotions,
        summary: diaryAnalytics?.writing || '',
        writingDay: currentDate.format('YYYY-MM-DD'),
      },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  const onChangeDiary = (content: string) => {
    setDiaryData((prev: DiaryContent) => ({ ...prev, content }));
  };

  const onEmotionCheckboxChange = (value: string) => {
    if (checkedEmotions.includes(value)) {
      setCheckedEmotions(
        checkedEmotions.filter((emotion) => emotion !== value)
      );
    } else {
      setCheckedEmotions([...checkedEmotions, value]);
    }
  };

  // TODO: 요일 추가
  const currentFullDate = `${currentDate.format('YYYY')}년 ${currentDate.format(
    'MM'
  )}월 ${currentDate.format('DD')}일`;

  if (getAnalyticsMutation.isPending && !isWriting) {
    return (
      <AnalyticsLoading
        cancelFn={() => {
          setIsWriting(true);
        }}
      />
    );
  }

  const addButtonDisabled = checkedEmotions.length === 0;

  const dedupedEmotions = diaryAnalytics?.emotion
    ? Array.from(new Set(diaryAnalytics.emotion))
    : [];

  return (
    <>
      {step === 1 && (
        <WritePageContainer>
          <DateSelectModal
            isOpen={isOpen}
            closeFn={() => {
              setIsOpen(false);
            }}
          />
          <WritePageMenu>
            <IconBtn onClick={() => navigate(-1)}>
              <CancleIcon />
            </IconBtn>
            <WritingDayTitle>
              <div>
                {currentDate.format('YY')}년&nbsp;{currentDate.month() + 1}
                월&nbsp;
                {currentDate.date()}일
              </div>
              <OpenModalIcon onClick={() => setIsOpen(true)} />
            </WritingDayTitle>
            <AnalyzeBtn onClick={onAnalyzeButtonClick}>일기 전송</AnalyzeBtn>
          </WritePageMenu>
          <WriteArea
            ref={contentRef}
            onChange={(event) => {
              onChangeDiary(event.target.value);
            }}
            placeholder="오늘 하루 있었던 일을 작성해보아요!"
          />
        </WritePageContainer>
      )}
      {step === 2 && (
        <Flex flex="col">
          <AnalysisResultHeader>
            {/* 아이콘 추가 */}
            <div
              style={{
                width: 24,
                height: 24,
                cursor: 'pointer',
                background: 'gray',
              }}
              onClick={() => setStep(1)}
            />
            <AnalysisResultTitle>일기 감정 분석 결과</AnalysisResultTitle>
            <div style={{ width: 24 }} />
          </AnalysisResultHeader>
          <ContentContainer>
            <Flex mt={24} items="center" gap={8}>
              <img src={book} alt="book" />
              <Subtitle>{userNickname}님이 작성한 일기</Subtitle>
            </Flex>
            <Flex mt={12}>
              <Chip>{currentFullDate}</Chip>
            </Flex>
            <Content>{diaryData.content}</Content>
            <Flex mt={24} items="center" gap={8}>
              <img src={lollipop} alt="lollipop" />
              <Subtitle>한 줄 요약</Subtitle>
            </Flex>
            <Summary>
              {diaryAnalytics?.writing || '요약할 내용이 없어요 :('}
            </Summary>
            <Flex mt={24} items="center" gap={8}>
              <img src={gaze} alt="gaze" />
              <Subtitle>오늘 이런 감정을 느꼈네요!</Subtitle>
            </Flex>
            <SummarySubtitleDescription>
              일기에 기록하고 싶은 감정을 1개 이상 선택해주세요.
            </SummarySubtitleDescription>
            <Flex mt={12} gap={8} wrap="wrap">
              {dedupedEmotions.map((emotion, index) => (
                <EmotionCheckbox
                  key={index}
                  checked={checkedEmotions.includes(emotion)}
                  value={emotion}
                  label={emotion}
                  onChange={onEmotionCheckboxChange}
                />
              ))}
            </Flex>
            {/* <Flex mt={24} items="center" gap={8}>
              <Checkbox
                checked={bookmarkCheckbox.checked}
                onChange={bookmarkCheckbox.onChange}
                id="checkbox"
              />
              <CheckboxLabel htmlFor="checkbox">
                일기 북마크 설정하기
              </CheckboxLabel>
            </Flex> */}
            <Flex mt={12} flex="col">
              <Button disabled={addButtonDisabled} onClick={onAddButtonClick}>
                작성 완료
              </Button>
            </Flex>
          </ContentContainer>
        </Flex>
      )}
    </>
  );
}

export const WritePageContainer = styled.div`
  padding-top: 44px;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const WritingDayTitle = styled.div`
  color: #1a1a1a;
  font-weight: 600;
  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnalyzeBtn = styled.button`
  border: 1px solid rgba(153, 153, 153, 0.6);
  background-color: #f9f9f9;
  padding: 8px;
  word-break: keep-all;
  border-radius: 8px;
`;

export const IconBtn = styled.button`
  border: 0px solid transparent;
  background-color: transparent;
  padding: 4px;
`;

export const WritePageMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.2fr 1fr;
  align-items: center;
  text-align: center;
  padding: 9px 24px;

  & > ${IconBtn} {
    width: fit-content;
    justify-items: start;
  }

  & > ${AnalyzeBtn} {
    width: fit-content;
    justify-self: end;
  }
`;

export const WriteArea = styled.textarea`
  width: 100%;
  border: 0px transparent;
  background-color: #f2f2f2;
  min-height: 375px;
  resize: none;
  padding: 24px;

  &:focus {
    outline: none;
  }
`;

const AnalysisResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  height: 56px;
`;

const AnalysisResultTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  color: #1a1a1a;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 56px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const Chip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4d4c4c;
  font-size: 12px;
  font-weight: 400;
  padding: 4px;
  border-radius: 4px;

  background-color: #e0e0e0;
`;

const Content = styled.div`
  margin-top: 2px;
  border: 1px solid rgba(102, 102, 102, 0.4);
  border-radius: 8px;
  padding: 24px 16px;
  color: #4b4b4b;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
`;

const SummarySubtitleDescription = styled.p`
  margin-top: 4px;
  font-size: 13px;
  color: #808080;
`;

const CheckboxLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #666666;
`;

const Summary = styled.div`
  margin-top: 8px;
  border: 1px solid rgba(102, 102, 102, 0.4);
  border-radius: 8px;
  padding: 8px 24px;
  color: #4b4b4b;
  font-size: 14px;
  line-height: 23px;
`;
