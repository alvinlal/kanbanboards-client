import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { me } from '../../api/auth';
import storageKeys from '../../local-storage/storageKeys';
import queryKeys from '../../react-query/queryKeys';
import User from '../../types/User';

interface UseUser {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

const useUser = (): UseUser => {
  const queryClient = useQueryClient();

  const updateUser = useCallback(
    (newUser: User) => {
      queryClient.setQueryData([queryKeys.user], newUser);
    },
    [queryClient]
  );

  const clearUser = useCallback(() => {
    queryClient.setQueryData([queryKeys.user], null);
  }, [queryClient]);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery([queryKeys.user], me, {
    retry: (_, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false;
      }
      return true;
    },
    initialData: () => {
      const storedUser = localStorage.getItem(storageKeys.user);
      return storedUser ? JSON.parse(storedUser) : null;
    },
    onSuccess: (received: User | null) => {
      if (!received) {
        localStorage.removeItem(storageKeys.user);
      } else {
        localStorage.setItem(storageKeys.user, JSON.stringify(received));
      }
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

export default useUser;
