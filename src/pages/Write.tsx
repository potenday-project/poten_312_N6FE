import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import { ReactComponent as CancleIcon } from 'assets/write/cancel.svg';
import styled from 'styled-components';
import { DiaryDataState } from 'store/DiaryDataState';
import { ReactComponent as OpenModalIcon } from 'assets/dateSelect/openModal.svg';
import DateSelectModal from 'components/common/DateSelectModal';

export default function Write() {
  const [currentDate] = useRecoilState(CurrentDateState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [diaryData, setDiaryData] = useRecoilState(DiaryDataState);
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const onChangeDiary = (content: string) => {
    setDiaryData((prev) => ({ ...prev, content }));
  };

  return (
    <WritePageContainer>
      {/* <DateSelectModal
        isOpen={true}
        closeFn={() => {
          setIsOpen(false);
        }}
      /> */}
      <WritePageMenu>
        <IconBtn onClick={() => navigate(-1)}>
          <CancleIcon />
        </IconBtn>
        <WritingDayTitle>
          <div>
            {currentDate.format('YY')}년&nbsp;{currentDate.month() + 1}월&nbsp;
            {currentDate.date()}일
          </div>
          <OpenModalIcon />
        </WritingDayTitle>

        <AnalyzeBtn
          onClick={() => {
            console.log(diaryData.content);
          }}
        >
          일기 전송
        </AnalyzeBtn>
      </WritePageMenu>

      <WriteArea
        ref={contentRef}
        onChange={(event) => {
          onChangeDiary(event.target.value);
        }}
        placeholder="오늘 하루 있었던 일을 작성해보아요!"
      />
    </WritePageContainer>
  );
}

export const WritePageContainer = styled.div`
  padding-top: 44px;
  width: 100%;
  min-height: 100vh;
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
