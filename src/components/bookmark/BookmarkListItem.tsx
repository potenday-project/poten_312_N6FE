import { BookmarkSolidIcon, EnterPageIcon } from 'assets/common';
import EmotionLabel from 'components/common/EmotionLabel';
import Flex from 'components/common/Flex';
import IconButton from 'components/common/IconButton';
import Text from 'components/common/Text';
import { Emotion } from 'constants/enum';
import styled from 'styled-components';

const DUMMY_WRITTEN_AT = '13일 (수)';

interface BookmarkListItemProps {
  summary: string;
  emotions: Emotion[];
}

export default function BookmarkListItem({
  summary,
  emotions,
}: BookmarkListItemProps) {
  return (
    <Container>
      <Flex justify="between" items="center">
        <Flex items="center" gap={8}>
          <IconButton>
            <BookmarkSolidIcon />
          </IconButton>
          <WrittenDate>{DUMMY_WRITTEN_AT}</WrittenDate>
        </Flex>
        <DetailButton>
          <Text color="#666666" size={13} weight={500}>
            일기 상세보기
          </Text>
          <EnterPageIcon />
        </DetailButton>
      </Flex>
      <DashedLine />
      <Flex mt={8}>
        <Summary>{summary}</Summary>
      </Flex>
      <EmotionLabelContainer>
        {emotions.map((emotion, index) => (
          <EmotionLabel key={index} emotion={emotion} />
        ))}
      </EmotionLabelContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
`;

const EmotionLabelContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Summary = styled.p`
  color: #4b4b4b;
  font-size: 14px;
`;

const DashedLine = styled.div`
  margin-top: 8px;
  border-top: 1px dashed #e6e6e6;
`;

const WrittenDate = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #666666;
`;

const DetailButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;
