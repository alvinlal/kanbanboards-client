/* eslint-disable no-console */
// this wrapper is for testing only

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});
export const RQWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
