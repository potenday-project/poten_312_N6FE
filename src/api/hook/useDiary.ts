import { useQuery, useMutation } from '@tanstack/react-query';
import { diaryApis } from '../diaryApis';

export function useGetMonthlyDiary(month: string) {
  return useQuery({
    queryKey: ['monthly-diary', month],
    queryFn: () => diaryApis.getMonthlyDiary(month),
  });
}

export function useGetDiary(diaryId: number) {
  return useQuery({
    queryKey: ['diary'],
    queryFn: () => diaryApis.getDiary(diaryId),
  });
}

export function usePostDiary() {
  return useMutation({
    mutationFn: diaryApis.postDiary,
  });
}
