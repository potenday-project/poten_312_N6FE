import { Emotion } from 'constants/enum';

export interface DiaryContent {
  content: string;
}

export interface DiaryData {
  summary: string;
  content: string;
  emotion: string[];
  writingDay: string;
}

export interface EditDiaryData extends Partial<DiaryData> {
  id: number;
}

export interface EditDiaryData extends Partial<DiaryData> {
  id: number;
}

export interface DiaryResponse {
  id: number;
  emotion: Emotion[];
  summary: string;
  content: string;
  writingDay: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryAnalytics extends DiaryResponse {
  writing: string;
}

export type MonthlyDiary = DiaryResponse[];

export interface CommonResponse<T> {
  code: 'SUCCESS' | 'ERROR' | 'FAIL';
  data: T;
  message: string;
  statusCode: number;
}
