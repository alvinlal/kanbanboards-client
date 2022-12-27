import { useMemo } from 'react';
import { AllBoardsResponse } from '../../../api/board/dto/response/AllBoardsResponse.dto';
import { useAllBoards } from '../../../hooks/useAllBoards/useAllBoards';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { useToggleLeftSideNav } from '../../../hooks/useToggleLeftSideNav/useToggleLeftSideNav';
import SkeletonBlock from '../../SkeletonBlock/SkeletonBlock';

interface UseLeftSideNav {
  LoadingBlocks: React.ReactNode[];
  allBoards: AllBoardsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isLeftSideNavOpen: boolean;
  toggleLeftSideNav: () => void;
  logOut: () => Promise<void>;
}

export const useLeftSideNav = (): UseLeftSideNav => {
  const { allBoards, isLoading, isError } = useAllBoards();
  const { isLeftSideNavOpen, toggleLeftSideNav } = useToggleLeftSideNav();
  const { logOut } = useAuth();

  const LoadingBlocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < 6; i += 1) {
      blocks.push(<SkeletonBlock width="200px" height="30px" key={i} />);
    }

    return blocks;
  }, []);

  return {
    LoadingBlocks,
    allBoards,
    isLoading,
    isError,
    isLeftSideNavOpen,
    toggleLeftSideNav,
    logOut,
  };
};
