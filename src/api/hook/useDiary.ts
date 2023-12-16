import { useQuery, useMutation } from '@tanstack/react-query';
import { diaryApis } from '../diaryApis';

export function useGetDiary(diaryId: number) {
  return useQuery({
    queryKey: ['diary'],
    queryFn: () => diaryApis.getDiary(diaryId),
  });
}

export function useGetMonthlyDiary(month: string) {
  return useQuery({
    queryKey: ['diaryMonth', month],
    queryFn: () => {
      return diaryApis.getMonthlyDiary(month);
    },
  });
}

export function usePostDiary() {
  return useMutation({
    mutationFn: diaryApis.postDiary,
  });
}
