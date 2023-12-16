import { atom } from 'recoil';

interface DiaryContent {
  content: string;
}

export const DiaryDataState = atom<DiaryContent>({
  key: 'DiaryDataState',
  default: { content: '' },
});
