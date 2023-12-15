import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'pages/Login';
import Home from 'pages/Home';
import KakaoOauth from 'component/home/KakaoOauth';
import NaverOauth from 'component/home/NaverOauth';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
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
