export const Emotion = {
  COMFORTABLE: '편안한',
  HAPPY: '기쁜',
  EXCITED: '신이 난',
  ASHAMED: '부끄러운',
  EMBARASSED: '당황한',
  DEPRESSED: '우울한',
  SAD: '슬픈',
  REGRETTED: '후회하는',
  ANNOYED: '짜증내는',
  ANGRY: '분노',
  WORRIED: '걱정스러운',
  ANXIOUS: '불안한',
  STRESSED: '스트레스 받은',
  LONELY: '외로운',
  UNFAIR: '억울한',
} as const;

export type Emotion = (typeof Emotion)[keyof typeof Emotion];
