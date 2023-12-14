import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components';

export default function DefaultLayout() {
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  return (
    <DefaultLayoutContainer>
      <Outlet />
    </DefaultLayoutContainer>
  );
}

const DefaultLayoutContainer = styled.div`
  max-width: 375px;
  min-height: 100vh;
  margin: auto;
  padding: 0px 24px;

  /* background-color: aliceblue; */
`;
