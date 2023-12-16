import { Emotion } from 'constants/enum';
import styled from 'styled-components';

interface EmotionLabelProps {
  emotion: Emotion;
}

export default function EmotionLabel({ emotion }: EmotionLabelProps) {
  return (
    <Container emotion={emotion}>
      <Indicator emotion={emotion} />
      <Label emotion={emotion}>{labelByEmotion[emotion]}</Label>
    </Container>
  );
}

const labelByEmotion = {
  [Emotion.COMFORTABLE]: '편안한',
  [Emotion.HAPPY]: '기쁜',
  [Emotion.EXCITED]: '신이 난',
  [Emotion.ASHAMED]: '부끄러운',
  [Emotion.EMBARASSED]: '당황한',
  [Emotion.DEPRESSED]: '우울한',
  [Emotion.SAD]: '슬픈',
  [Emotion.REGRETTED]: '후회하는',
  [Emotion.ANNOYED]: '짜증내는',
  [Emotion.ANGRY]: '분노',
  [Emotion.WORRIED]: '걱정스러운',
  [Emotion.ANXIOUS]: '불안한',
  [Emotion.STRESSED]: '스트레스 받은',
  [Emotion.LONELY]: '외로운',
  [Emotion.UNFAIR]: '억울한',
};

const colorByEmotion = {
  [Emotion.COMFORTABLE]: {
    container: 'rgba(133, 224, 142, 0.20)',
    indicator: '#85E08E',
    label: '#15511B',
  },

  [Emotion.HAPPY]: {
    container: 'rgba(192, 224, 110, 0.20)',
    indicator: '#C0E06E',
    label: '#415412',
  },
  [Emotion.EXCITED]: {
    container: 'rgba(111, 224, 199, 0.20)',
    indicator: '#6FE0C7',
    label: '#125445',
  },
  [Emotion.ASHAMED]: {
    container: 'rgba(255, 246, 102, 0.20)',
    indicator: '#FFF666',
    label: '#666000',
  },
  [Emotion.EMBARASSED]: {
    container: 'rgba(255, 209, 102, 0.20)',
    indicator: '#FFD166',
    label: '#664700',
  },

  [Emotion.DEPRESSED]: {
    container: 'rgba(76, 77, 255, 0.20)',
    indicator: '#4C4DFF',
    label: '#0001CC',
  },
  [Emotion.SAD]: {
    container: 'rgba(113, 163, 255, 0.20)',
    indicator: '#71A3FF',
    label: '#002D80',
  },
  [Emotion.REGRETTED]: {
    container: 'rgba(102, 198, 255, 0.20)',
    indicator: '#66C6FF',
    label: '#005080',
  },
  [Emotion.ANNOYED]: {
    container: 'rgba(255, 102, 194, 0.20)',
    indicator: '#FF66C2',
    label: '#66003D',
  },
  [Emotion.ANGRY]: {
    container: 'rgba(255, 65, 50, 0.20)',
    indicator: '#FF4132',
    label: '#4D0600',
  },
  [Emotion.WORRIED]: {
    container: 'rgba(255, 176, 46, 0.20)',
    indicator: '#FFB02E',
    label: '#663F00',
  },
  [Emotion.ANXIOUS]: {
    container: 'rgba(255, 136, 51, 0.20)',
    indicator: '#FF8833',
    label: '#662B00',
  },
  [Emotion.STRESSED]: {
    container: 'rgba(255, 102, 102, 0.20)',
    indicator: '#FF6666',
    label: '#660000',
  },
  [Emotion.LONELY]: {
    container: 'rgba(162, 128, 255, 0.20)',
    indicator: '#A280FF',
    label: '#290099',
  },
  [Emotion.UNFAIR]: {
    container: 'rgba(255, 154, 230, 0.20)',
    indicator: '#FF9AE6',
    label: '#800060',
  },
};

const Container = styled.div<EmotionLabelProps>`
  display: flex;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;

  background-color: ${({ emotion }) => colorByEmotion[emotion].container};
`;

const Indicator = styled.div<EmotionLabelProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;

  background-color: ${({ emotion }) => colorByEmotion[emotion].indicator};
`;

const Label = styled.p<EmotionLabelProps>`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;

  color: ${({ emotion }) => colorByEmotion[emotion].label};
`;
