import {
  AnalyticsTab,
  BookmarkTab,
  HomeTab,
  MyPageTab,
  NavigatorBackground,
  WriteBtn,
} from 'assets/navigator';
import { Outlet, useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { CurrentDateState } from 'store/CurrentDateState';
import styled from 'styled-components';

export default function MainLayout() {
  const resetCurrentDate = useResetRecoilState(CurrentDateState);

  const navigate = useNavigate();

  const onClickTab = (router: string) => {
    navigate(router);
  };

  const onClickWriteDiary = () => {
    resetCurrentDate();
    navigate('write');
  };

  return (
    <>
      <Outlet />
      <NavigatorContainer>
        <NavigatorBackground />
        <CreateDiaryContainer onClick={onClickWriteDiary}>
          <WriteBtn />
        </CreateDiaryContainer>
        <LeftIconContainer>
          <TabContainer
            onClick={() => {
              onClickTab('/');
            }}
          >
            <HomeTab />
          </TabContainer>
          <TabContainer
            onClick={() => {
              onClickTab('/bookmark');
            }}
          >
            <BookmarkTab />
          </TabContainer>
        </LeftIconContainer>
        <RightIconContainer>
          <TabContainer
            onClick={() => {
              onClickTab('/statistics');
            }}
          >
            <AnalyticsTab />
          </TabContainer>
          <TabContainer>
            <MyPageTab
              onClick={() => {
                onClickTab('/mypage');
              }}
            />
          </TabContainer>
        </RightIconContainer>
      </NavigatorContainer>
    </>
  );
}

const NavigatorContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
`;

const IconBtn = styled.div`
  position: absolute;
  cursor: pointer;
`;

const CreateDiaryContainer = styled(IconBtn)`
  top: -40%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  box-shadow: 6px 6px 12px rgba(178, 178, 178, 0.25);
`;

const TabContainer = styled.div`
  padding: 15px;
  cursor: pointer;
`;

const TabsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  gap: 10px;
  display: flex;
`;

const LeftIconContainer = styled(TabsContainer)`
  margin-left: 10px;
`;

const RightIconContainer = styled(TabsContainer)`
  right: 0;
  margin-right: 10px;
`;
