import { useLocation } from 'react-router';

export default function NaverOauth() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const codeValue = urlParams.get('code');

  return <>네이버 리다이렉트 페이지</>;
}
