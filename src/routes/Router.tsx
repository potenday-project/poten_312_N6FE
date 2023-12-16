import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'pages/Login';
import Home from 'pages/Home';
import KakaoOauth from 'components/login/KakaoOauth';
import NaverOauth from 'components/login/NaverOauth';
import MainLayout from 'layout/MainLayout';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/bookmark', element: <>bookmakr</> },
        ],
      },
      { path: '/login', element: <Login /> },
      {
        path: '/oauth',
        children: [
          { path: 'kakao', element: <KakaoOauth /> },
          { path: 'naver', element: <NaverOauth /> },
        ],
      },
    ],
  },
]);
