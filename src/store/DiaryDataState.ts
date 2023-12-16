import { diaryContent } from 'api/diaryApis';
import { atom } from 'recoil';

export const DiaryDataState = atom<diaryContent>({
  key: 'DiaryDataState',
  default: { content: '' },
});
