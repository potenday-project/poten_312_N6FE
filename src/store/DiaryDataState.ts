import { DiaryContent } from 'api/diaryApis';
import { atom } from 'recoil';

export const DiaryDataState = atom<DiaryContent>({
  key: 'DiaryDataState',
  default: { content: '' },
});
