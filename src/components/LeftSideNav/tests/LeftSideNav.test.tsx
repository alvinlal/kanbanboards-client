/* eslint-disable no-console */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { apiEndPoint } from '../../../../test-utils/msw/baseUrls';
import defaultHandlers from '../../../../test-utils/msw/defaultHandlers';
import { AllboardsController } from '../../../../test-utils/msw/handlers/board/controllers/AllboardsController';
import { rest, server } from '../../../../test-utils/msw/server';
import LeftSideNav from '../LeftSideNav';

describe('LeftSideNav.tsx', () => {
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
  it('should show skeleton blocks while loading', async () => {
    server.use(rest.get(apiEndPoint('/boards/all'), defaultHandlers.LOADING));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const skeletonBlocks = await screen.findByTestId('skeleton-blocks');

    expect(skeletonBlocks).toBeInTheDocument();
  });

  it('should show error message on error', async () => {
    server.use(rest.get(apiEndPoint('/boards/all'), defaultHandlers[500]));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('Something went wrong !')).toBeInTheDocument();
  });

  it('should show correct message when board list is empty', async () => {
    server.use(rest.get(apiEndPoint('/boards/all'), AllboardsController.EMPTY));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('No boards found')).toBeInTheDocument();
  });

  it('should match snapshot in loading state', () => {
    server.use(rest.get(apiEndPoint('/boards/all'), defaultHandlers.LOADING));

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot in error state', async () => {
    server.use(rest.get(apiEndPoint('/boards/all'), AllboardsController[500]));

    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeftSideNav />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Something went wrong !')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it.todo('should add a new board');

  it.todo('should delete a board');
});
