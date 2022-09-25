import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <>
      <div>BaseLayout</div>
      <Outlet />
    </>
  );
};

export default BaseLayout;
