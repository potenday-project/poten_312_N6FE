import instance from 'shared/axios';

export interface DiaryContent {
  content: string;
}
export interface DiaryData extends DiaryContent {
  summary: string;
  emotion: string[];
}

export interface PostDiaryData extends DiaryData {
  writingDay: string;
}

export interface EditDiaryData extends DiaryData {
  id: number;
}

export interface MonthlyDiaryRespose {
  id: number;
  emotion: string[];
  summary: string;
  content: string;
  writingDay: string;
  createdAt: string;
  updatedAt: string;
}

export const diaryApis = {
  getMonthlyDiary: async (month: string): Promise<MonthlyDiaryRespose[]> =>
    await instance.get(`/api/diary/list?month=${month}`),

  getDiary: async (diaryId: number) =>
    await instance.get(`/api/diary/${diaryId}`),

  postDiary: async (diaryData: PostDiaryData) =>
    await instance.post(`/api/diary`, diaryData),

  editDiary: async (diaryData: EditDiaryData) =>
    await instance.put(`/api/diary`, diaryData),

  deleteDiary: async (diaryId: number) =>
    await instance.delete(`/api/diary/${diaryId}`),
};
