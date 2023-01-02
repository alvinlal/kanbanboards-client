/* eslint-disable no-console */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeftSideNav from '../../../LeftSideNav';

describe('BoardList.tsx', () => {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    queryClient.clear();
  });

  it('should render board list correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId('board-list-wrapper')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-blocks')).not.toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
