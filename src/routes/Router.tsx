import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'pages/Login';
import Home from 'pages/Home';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      { path: '/login', element: <Login /> },
    ],
  },
]);
