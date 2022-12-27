import { useAuth } from '../../../hooks/useAuth/useAuth';
import { useToggleLeftSideNav } from '../../../hooks/useToggleLeftSideNav/useToggleLeftSideNav';

interface UseHeader {
  toggleLeftSideNav: () => void;
  logOut: () => Promise<void>;
}

export const useHeader = (): UseHeader => {
  const { logOut } = useAuth();
  const { toggleLeftSideNav } = useToggleLeftSideNav();

  return {
    toggleLeftSideNav,
    logOut,
  };
};
