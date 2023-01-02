import { useCallback } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { createBoard } from '../../api/board';
import queryKeys from '../../react-query/queryKeys';
import { CreateBoardResponseDto } from '../../api/board/dto/response/CreateBoardResponse.dto';
import { CreateBoardRequestDto } from '../../api/board/dto/request/CreateBoardRequest.dto';

interface UseBoards {
  addBoard: UseMutationResult<
    CreateBoardResponseDto,
    unknown,
    CreateBoardRequestDto,
    {
      previousBoards: unknown;
    }
  >;
  removeBoard: (_id: string) => void;
  duplicateBoard: (_id: string) => void;
}

export const useBoards = (): UseBoards => {
  const queryClient = useQueryClient();

  const addBoard = useMutation({
    mutationFn: (newBoard: CreateBoardRequestDto) => createBoard(newBoard),
    onMutate: async (newBoard: CreateBoardRequestDto) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.allBoards] });
      const previousBoards = queryClient.getQueryData([queryKeys.allBoards]);

      queryClient.setQueryData([queryKeys.allBoards], (boards: any) => [...boards, newBoard]);
      // set individual board also on queryClient

      return { previousBoards };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([queryKeys.allBoards], context?.previousBoards);
      // show toast
      //
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.allBoards]);
    },
  });

  const removeBoard = useCallback((_id: string) => {}, []);

  const duplicateBoard = useCallback((_id: string) => {}, []);

  return {
    duplicateBoard,
    removeBoard,
    addBoard,
  };
};
