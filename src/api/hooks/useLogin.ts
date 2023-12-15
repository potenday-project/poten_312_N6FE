import { useQuery } from 'react-query';
import instance from 'shared/axios';

export const useLogin = (codeValue: string) => {
  return useQuery(
    ['login'],
    async () => await instance.post(`/api/user/kakao?code=${codeValue}`),
    {
      onSuccess(data) {
        return data;
      },
    }
  );
};
