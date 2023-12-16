import { useQuery, useMutation } from '@tanstack/react-query';
import { IDiaryData, diaryApis } from '../diaryApis';

export function useGetDiary(diaryId: number) {
  return useQuery({
    queryKey: ['diary'],
    queryFn: () => {
      return diaryApis.getDiary(diaryId);
    },
  });
}

export function usePostDiary() {
  return useMutation({
    mutationFn: (diaryData: IDiaryData) => {
      return diaryApis.postDiary(diaryData);
    },
  });
}
