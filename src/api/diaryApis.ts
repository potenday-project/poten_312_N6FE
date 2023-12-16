import instance from 'shared/axios';

export interface IDiaryData {
  summary: string;
  content: string;
  emotion: string[];
}

export interface IEditDiary extends IDiaryData {
  diaryId: number;
}

export const diaryApis = {
  getDiary: async (diaryId: number) =>
    await instance.get(`/api/dairy/${diaryId}`),

  postDiary: async (diaryData: IDiaryData) =>
    await instance.post(`/api/dairy`, diaryData),

  editDiary: async (diaryData: IEditDiary) =>
    await instance.put(`/api/dairy`, diaryData),

  deleteDiary: async (diaryId: number) =>
    await instance.delete(`/api/dairy/${diaryId}`),
};
