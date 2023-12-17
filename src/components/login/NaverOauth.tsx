import { useLocation, useNavigate } from 'react-router';
import instance from 'shared/axios';
import { setItem } from 'utils/localStorage';

interface TokenSet {
  Authorization: string;
  id: string;
  nickname: string;
}
export interface ILoginResponse {
  data: TokenSet;
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
