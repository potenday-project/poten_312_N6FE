import { useLocation } from 'react-router';

export default function KakaoOauth() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  console.log(codeValue);

  return <>카카오 리다이렉트 페이지</>;
}
