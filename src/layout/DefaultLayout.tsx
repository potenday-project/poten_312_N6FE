import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function DefaultLayout() {
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  return <Outlet />;
}
