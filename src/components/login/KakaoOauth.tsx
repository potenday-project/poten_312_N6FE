import { useLocation, useNavigate } from 'react-router';
import instance from 'shared/axios';
import { setItem } from 'utils/localStorage';
import { ILoginResponse } from './NaverOauth';
import { useEffect } from 'react';

export default function KakaoOauth() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  const Login = async () => {
    const response: ILoginResponse = await instance.post(
      `/api/user/kakao?code=${codeValue}`
    );

    if (response.data) {
      setItem('token', response.data.Authorization);
      setItem('id', response.data.id);
      setItem('nickname', response.data.nickname);
      navigate('/');
    }
  };

  Login();

  return <></>;
}
