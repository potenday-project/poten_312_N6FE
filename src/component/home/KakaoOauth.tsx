import { useEffect } from 'react';
import { useLocation } from 'react-router';
import instance from 'shared/axios';

export default function KakaoOauth() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  const Login = async () => {
    const response = await instance.post(`/api/user/kakao?code=${codeValue}`);
    return response;
  };

  useEffect(() => {
    console.log(Login());
  }, []);

  return <>카카오 리다이렉트 페이지</>;
}
