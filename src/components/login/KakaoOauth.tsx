import { useLocation, useNavigate } from 'react-router';
import instance from 'shared/axios';
import { getItem, setItem } from 'utils/localStorage';
import { ILoginResponse } from './NaverOauth';
import { useEffect, useState } from 'react';

export default function KakaoOauth() {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  const Login = async () => {
    const response: ILoginResponse = await instance.post(
      `/api/user/kakao?code=${codeValue}`
    );

    setItem('token', response.Authorization);
    setItem('id', response.id);
    setItem('nickname', response.nickname);
    navigate('/');
  };

  Login();

  return <></>;
}
