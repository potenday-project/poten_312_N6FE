import { useLocation, useNavigate } from 'react-router';
import instance from 'shared/axios';
import { setItem } from 'utils/localStorage';

export interface ILoginResponse {
  Authorization: string;
  id: string;
  nickname: string;
}

export default function NaverOauth() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  const Login = async () => {
    const response: ILoginResponse = await instance.post(
      `/api/user/naver?code=${codeValue}`
    );
    setItem('token', response.Authorization);
    setItem('id', response.id);
    setItem('nickname', response.nickname);
    navigate('/');
  };

  Login();

  return <></>;
}
