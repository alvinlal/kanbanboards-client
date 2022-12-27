import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import queryKeys from '../../react-query/queryKeys';

interface UseToggleLeftSideNav {
  isLeftSideNavOpen: boolean;
  toggleLeftSideNav: () => void;
}

export const useToggleLeftSideNav = (): UseToggleLeftSideNav => {
  const queryClient = useQueryClient();
  const { data: isLeftSideNavOpen } = useQuery([queryKeys.isLeftSideNavOpen], {
    enabled: false,
    initialData: false,
  });

  const toggleLeftSideNav = useCallback(() => {
    queryClient.setQueryData(
      [queryKeys.isLeftSideNavOpen],
      (current: boolean | undefined) => !current
    );
  }, [queryClient]);

  return {
    isLeftSideNavOpen,
    toggleLeftSideNav,
  };
};
