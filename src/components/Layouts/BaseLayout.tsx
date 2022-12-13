import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser/useUser';
import Header from '../Header/Header';

const BaseLayout: React.FC = () => {
  const { user } = useUser();
  const { pathname } = useLocation();

  return (
    <>
      <Header authenticated={!!user} boardPage={!!matchPath(`/board/:boardId`, pathname)} />
      <Outlet />
    </>
  );
};

export default BaseLayout;
