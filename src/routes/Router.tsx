import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'pages/Login';
import Home from 'pages/Home';
import KakaoOauth from 'components/login/KakaoOauth';
import NaverOauth from 'components/login/NaverOauth';
import MainLayout from 'layout/MainLayout';
import Write from 'pages/Write';
import DiaryDetail from 'pages/DiaryDetail';
import Bookmark from 'pages/Bookmark';
import Statistics from 'pages/Statistics';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/bookmark', element: <Bookmark /> },
          { path: '/statistics', element: <Statistics /> },
        ],
      },
      { path: '/write', element: <Write /> },
      { path: '/login', element: <Login /> },
      { path: '/diary/:id', element: <DiaryDetail /> },
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
