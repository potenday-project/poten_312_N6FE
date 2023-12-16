import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import locale from 'dayjs/locale/ko';

export const CurrentDateState = atom<Dayjs>({
  key: 'CurrentDateState',
  default: dayjs(new Date()).locale({ ...locale }),
});
