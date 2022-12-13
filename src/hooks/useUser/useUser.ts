import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { me } from '../../api/auth';
import storageKeys from '../../local-storage/storageKeys';
import queryKeys from '../../react-query/queryKeys';
import User from '../../types/User';

interface UseUser {
  user: User | null | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export const useUser = (): UseUser => {
  const queryClient = useQueryClient();

  const updateUser = useCallback(
    (newUser: User) => {
      queryClient.setQueryData([queryKeys.user], newUser);
      localStorage.setItem(storageKeys.user, JSON.stringify(newUser));
    },
    [queryClient]
  );

  const clearUser = useCallback(() => {
    queryClient.setQueryData([queryKeys.user], null);
    localStorage.removeItem(storageKeys.user);
  }, [queryClient]);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery([queryKeys.user], me, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: (_, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false;
      }
      return true;
    },
    onSuccess: (received: User | null) => {
      localStorage.setItem(storageKeys.user, JSON.stringify(received));
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        clearUser();
        localStorage.removeItem(storageKeys.user);
      }
    },
  });
  return { user, isLoading, isSuccess, isError, updateUser, clearUser };
};
