import { useGetDiary } from 'api/hook/useDiary';
import Flex from 'components/common/Flex';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import lollipop from 'assets/common/lollipop.png';
import gaze from 'assets/common/gaze.png';
import EmotionLabel from 'components/common/EmotionLabel';
import { Emotion } from 'constants/enum';
import { BackArrowIcon } from 'assets/home';
import IconButton from 'components/common/IconButton';

export default function DiaryDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const diaryId = params.id as string;

  const { data } = useGetDiary(Number(diaryId));
  const diary = data?.diaryResponse;

  // TODO: 로딩 UI 추가
  if (!diary) return null;

  return (
    <Flex flex="col">
      <Container>
        <Header>
          <IconButton onClick={() => navigate('/')}>
            <BackArrowIcon stroke="#333333" />
          </IconButton>
          <HeaderTitle>{diary.createdAt.split(' ')[0]}</HeaderTitle>
        </Header>
        <Content>{diary.content}</Content>
        <Flex mt={24} items="center" gap={8}>
          <img src={lollipop} alt="lollipop" />
          <Subtitle>한 줄 요약</Subtitle>
          <Summary>{diary.summary || '요약할 내용이 없어요 :('}</Summary>
          <Flex mt={24} items="center" gap={8}>
            <img src={gaze} alt="gaze" />
            <Subtitle>이런 감정을 느꼈네요!</Subtitle>
            <SummarySubtitleDescription>
              일기에 기록하고 싶었던 감정이에요.
            </SummarySubtitleDescription>
            <Flex mt={12} gap={8} wrap="wrap">
              {diary.emotion.map((item, index) => (
                <EmotionLabel key={index} emotion={item as Emotion} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

const Header = styled.div`
  height: 56px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: 24px;
`;

const HeaderTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Container = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 24px;
  border: 1px solid rgba(102, 102, 102, 0.4);
  border-radius: 8px;
  padding: 24px 16px;
  color: #4b4b4b;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
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

const SummarySubtitleDescription = styled.p`
  margin-top: 4px;
  font-size: 13px;
  color: #808080;
`;
