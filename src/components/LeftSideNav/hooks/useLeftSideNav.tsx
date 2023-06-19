import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth/useAuth';
import { useBoards } from '../../../hooks/useBoards/useBoards';
import { useToggleLeftSideNav } from '../../../hooks/useToggleLeftSideNav/useToggleLeftSideNav';

interface UseLeftSideNav {
  isLeftSideNavOpen: boolean;
  toggleLeftSideNav: () => void;
  logOut: () => Promise<void>;
  newBoard: () => void;
}

export const useLeftSideNav = (): UseLeftSideNav => {
  const { addBoard } = useBoards();
  const { isLeftSideNavOpen, toggleLeftSideNav } = useToggleLeftSideNav();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const newBoard = useCallback(() => {
    const newBoardId = crypto.randomUUID();
    addBoard.mutate({ board_id: newBoardId, title: 'Untitled' });
    navigate(`/boards/${newBoardId}`, { state: { new: true } });
  }, [navigate, addBoard]);

  return {
    isLeftSideNavOpen,
    toggleLeftSideNav,
    logOut,
    newBoard,
  };
};
