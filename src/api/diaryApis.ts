import instance from 'shared/axios';

export interface diaryContent {
  content: string;
}
export interface diaryData extends diaryContent {
  summary: string;
  emotion: string[];
}

export interface postDiaryData extends diaryData {
  writingDay: string;
}

export interface editDiaryData extends diaryData {
  id: number;
}

export const diaryApis = {
  getDiary: async (diaryId: number) =>
    await instance.get(`/api/dairy/${diaryId}`),

  postDiary: async (diaryData: postDiaryData) =>
    await instance.post(`/api/dairy`, diaryData),

  editDiary: async (diaryData: editDiaryData) =>
    await instance.put(`/api/dairy`, diaryData),

  deleteDiary: async (diaryId: number) =>
    await instance.delete(`/api/dairy/${diaryId}`),
};
