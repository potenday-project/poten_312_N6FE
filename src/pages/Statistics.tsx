import Flex from 'components/common/Flex';
import styled from 'styled-components';
import trap from 'assets/common/trap.png';
import IconButton from 'components/common/IconButton';
import { TooltipMarkIcon } from 'assets/common';
import ServicePreparingFallback from 'components/common/ServicePrerparingFallback';

const DUMMY_SUMMARIES = [
  '친구와 00월드에 놀러갔어요.',
  '영화 <00000>을 관람했어요.',
];

export default function Statistics() {
  return (
    <ServicePreparingFallback />
    // <Container>
    //   <Title>일기 통계</Title>
    //   <Flex mt={16} items="center" gap={8}>
    //     <img src={trap} alt="trap" />
    //     <Subtitle>한 달 간 이런 감정을 느꼈어요.</Subtitle>
    //   </Flex>
    //   <Card>
    //     <div style={{ height: 196 }} />
    //   </Card>
    //   <Flex mt={24} justify="between" items="center">
    //     <Flex items="center" gap={8}>
    //       <img src={trap} alt="trap" />
    //       <Subtitle>한 달 간 감정이 이렇게 변화했어요.</Subtitle>
    //     </Flex>
    //     <IconButton>
    //       <TooltipMarkIcon />
    //     </IconButton>
    //   </Flex>
    //   <Card>
    //     <div style={{ height: 234 }} />
    //   </Card>
    //   <Flex mt={24} items="center" gap={8}>
    //     <img src={trap} alt="trap" />
    //     <Subtitle>한 달 간 이런 일들이 있었어요.</Subtitle>
    //   </Flex>
    //   <Card>
    //     {DUMMY_SUMMARIES.map((summary, index) => (
    //       <SummaryText key={index}>{summary}</SummaryText>
    //     ))}
    //   </Card>
    // </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f2f2;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

const Title = styled.h1`
  margin-top: 12px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  color: #1a1a1a;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const Card = styled.div`
  margin-top: 12px;
  background-color: #e6e6e6;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
`;

const SummaryText = styled.li`
  font-size: 13px;
  color: #666666;
  list-style-type: disc;
`;
