import styled from 'styled-components';
import LoadingTitleImg from 'assets/write/loading.png';
import LoadingMirrorImg from 'assets/write/LoadingMirror.png';
import { getItem } from 'utils/localStorage';
import { ReactComponent as GoBackIcon } from 'assets/write/back page.svg';
import { useNavigate } from 'react-router-dom';

interface AnalyticsProps {
  cancelFn: () => void;
}

export default function AnalyticsLoading({ cancelFn }: AnalyticsProps) {
  const nickname = getItem('nickname');
  return (
    <LoadingContainer>
      <IconContainer onClick={cancelFn}>
        <GoBackIcon />
      </IconContainer>

      <LoadingMirror />
      <LoadingTitle />
      <SubTitle>AI가 {nickname}님이 작성한 일기를 읽고 있어요.</SubTitle>
    </LoadingContainer>
  );
}

const IconContainer = styled.div`
  padding: 10px;
  left: 14px;
  position: absolute;
  top: 60px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  flex-direction: column;
`;

const SubTitle = styled.div`
  color: #7e7e7e;
  font-size: 0.8125rem;
`;

const ImgConatiner = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingTitle = styled(ImgConatiner)`
  background-image: url(${LoadingTitleImg});
  width: 159px;
  height: 29px;
  margin-bottom: 8px;
  margin-top: 50px;
`;

const LoadingMirror = styled(ImgConatiner)`
  background-image: url(${LoadingMirrorImg});
  width: 75px;
  height: 120px;
`;
