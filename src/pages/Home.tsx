import Calendar from 'components/home/Calendar';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import styled from 'styled-components';
import { ReactComponent as OpenModalIcon } from 'assets/dateSelect/openModal.svg';
import { BackArrowIcon, NextArrowIcon } from 'assets/home';
import MonthSelectModal from 'components/common/MonthSelectModal';
import LogoImg from 'assets/home/logo.png';
import { useState } from 'react';

export default function Home() {
  const [currentDate, setCurrentDate] = useRecoilState(CurrentDateState);
  const isCurrentMonth = dayjs().month() === currentDate.month();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dateAdd = () => {
    const monthResult = currentDate.add(1, 'month');
    setCurrentDate(monthResult);
  };

  const dateSub = () => {
    const monthResult = currentDate.subtract(1, 'month');
    setCurrentDate(monthResult);
  };

  return (
    <>
      <HomePageContainer>
        <MonthSelectModal isOpen={isOpen} closeFn={() => setIsOpen(false)} />

        <TitleLogo />

        <MonthContainer>
          <MonthSelectContainer onClick={() => setIsOpen(true)}>
            {currentDate.year()}년 {currentDate.month() + 1}월
            <OpenModalIcon />
          </MonthSelectContainer>

          <MonthArrowContainer>
            <IconBtn onClick={dateSub}>
              <BackArrowIcon />
            </IconBtn>
            <IconBtn onClick={dateAdd} disabled={isCurrentMonth && true}>
              <NextArrowIcon />
            </IconBtn>
          </MonthArrowContainer>
        </MonthContainer>

        <Calendar />
      </HomePageContainer>
    </>
  );
}

export const HomePageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 56px 24px 0px;
  background-color: #f2f2f2;
  position: relative;
`;

export const TitleLogo = styled.div`
  margin-bottom: 20px;
  width: 134px;
  height: 30px;
  background-image: url(${LogoImg});
  background-size: contain;
  background-repeat: no-repeat;
`;

export const MonthContainer = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const MonthSelectContainer = styled.div`
  gap: 8px;
  display: flex;
  font-size: 1.3rem;
  font-weight: 600;
  align-items: center;
  cursor: pointer;
`;

export const MonthArrowContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const IconBtn = styled.button`
  padding: 0px;
  border: 0px transparent;
  background-color: transparent;
  stroke: #333333;

  &:disabled {
    stroke: #cccccc;
  }
`;
