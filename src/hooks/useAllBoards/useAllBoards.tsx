import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '../../api/board';
import { AllBoardsResponse } from '../../api/board/dto/response/AllBoardsResponse.dto';

import queryKeys from '../../react-query/queryKeys';

interface UseAllBoards {
  allBoards: AllBoardsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const useAllBoards = (): UseAllBoards => {
  const { data: allBoards, isLoading, isError } = useQuery([queryKeys.allBoards], getAllBoards);

  return {
    allBoards,
    isLoading,
    isError,
  };
};
