import { atom } from 'recoil';
import { DiaryContent } from 'type/diaryResponse';

export const DiaryDataState = atom<DiaryContent>({
  key: 'DiaryDataState',
  default: { content: '' },
});
