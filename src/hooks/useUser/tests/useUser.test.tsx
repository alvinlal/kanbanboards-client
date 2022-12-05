/* eslint-disable no-console */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUser } from '../useUser';
import { server, rest } from '../../../../test-utils/msw/server';
import { apiEndPoint } from '../../../../test-utils/msw/baseUrls';
import { meController } from '../../../../test-utils/msw/handlers/auth/controllers/meController';

describe('useUser()', () => {
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    const queryClient = new QueryClient({
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });
  describe('when the user is logged out', () => {
    it('returned user should be null', async () => {
      server.use(rest.get(apiEndPoint('/auth/me'), meController[401]));

      const { result } = renderHook(() => useUser(), {
        wrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.user).toBe(null);
    });
  });
});
