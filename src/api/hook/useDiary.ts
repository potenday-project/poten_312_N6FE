import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { diaryApis } from '../diaryApis';

export function useGetDiary(diaryId: number) {
  return useQuery({
    queryKey: ['diary'],
    queryFn: () => diaryApis.getDiary(diaryId),
  });
}

export function useGetAnalytics() {
  return useMutation({
    mutationFn: diaryApis.getDiaryAnalytics,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: diaryApis.postDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['diaryMonth'],
      });
    },
  });
}
