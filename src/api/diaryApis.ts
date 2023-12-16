import instance from 'shared/axios';
import * as yup from 'yup';

export interface DiaryContent {
  content: string;
}

export interface DiaryData {
  summary: string;
  content: string;
  emotion: string[];
}

export interface EditDiaryData extends Partial<DiaryData> {
  id: number;
}

export interface EditDiaryData extends Partial<DiaryData> {
  id: number;
}

// TODO: 서버 api 추가 이후 enum으로 변경
export const emotionSchema = yup.string().required();

const diarySchema = yup.object({
  id: yup.number().required(),
  summary: yup.string().required(),
  content: yup.string().required(),
  emotion: yup.array(emotionSchema).required(),
  writingDay: yup.string().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
});

const monthlyDiarySchema = yup.array(diarySchema).required();

export type Diary = yup.InferType<typeof diarySchema>;
export type MonthlyDiary = yup.InferType<typeof monthlyDiarySchema>;

export const diaryApis = {
  getMonthlyDiary: async (month: string) => {
    const response = await instance.get(`/api/diary/list`, {
      params: { month },
    });
    return monthlyDiarySchema.validate(response.data);
  },
  getDiary: async (diaryId: number) => {
    const response = await instance.get(`/api/diary/${diaryId}`);
    return diarySchema.validate(response.data);
  },
  postDiary: async (diaryData: DiaryData) => {
    const response = await instance.post(`/api/diary`, diaryData);
    return response.data;
  },
  editDiary: async (diaryData: EditDiaryData) => {
    const response = await instance.put(`/api/diary`, diaryData);
    return response.data;
  },
  deleteDiary: async (diaryId: number) => {
    const response = await instance.delete(`/api/diary/${diaryId}`);
    return response.data;
  },
  getDiaryAnalytics: async (diaryContent: DiaryContent) => {
    const response = await instance.get(`api/diary/analytics`);
    return response.data;
  },
};
