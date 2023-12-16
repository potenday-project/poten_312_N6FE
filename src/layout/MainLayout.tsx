import { Outlet, useNavigate } from 'react-router-dom';

export default function MainLayout() {
  const navigate = useNavigate();

  const writeDiary = () => {
    navigate('/write');
  };

  console.log('MainLayout');

  return (
    <>
      <Outlet />
      <button onClick={writeDiary}> + </button>
    </>
  );
}
