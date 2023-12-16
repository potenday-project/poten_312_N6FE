import instance from 'shared/axios';

export interface IDiaryData {
  summary: string;
  content: string;
  emotion: string[];
}

export interface IEditDiary extends IDiaryData {
  diaryId: number;
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

  postDiary: async (diaryData: IDiaryData) =>
    await instance.post(`/api/diary`, diaryData),

  editDiary: async (diaryData: IEditDiary) =>
    await instance.put(`/api/diary`, diaryData),

  deleteDiary: async (diaryId: number) =>
    await instance.delete(`/api/diary/${diaryId}`),
};
