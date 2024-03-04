import instance, { Get, Post } from 'shared/axios';
import {
  DiaryAnalytics,
  DiaryContent,
  DiaryData,
  DiaryResponse,
  EditDiaryData,
} from 'type/diaryResponse';

export const diaryApis = {
  getMonthlyDiary: async (month: string) => {
    const { data } = await Get<DiaryResponse[]>(`/api/diary/list`, {
      params: { month },
    });
    return data.data;
  },

  getDiary: async (diaryId: number) => {
    const { data } = await Get<DiaryResponse>(`/api/diary/get/${diaryId}`);
    return data.data;
  },

  postDiary: async (diaryData: DiaryData) => {
    const { data } = await Post<DiaryResponse>(`/api/diary`, diaryData);
    return data.data;
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
    const { data } = await Post<DiaryAnalytics>(
      `api/diary/analytics`,
      diaryContent
    );
    return data.data;
  },
};
