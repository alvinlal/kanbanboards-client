import '../src/index.scss';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import handlers from '../test-utils/msw/handlers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initialize({
  onUnhandledRequest: 'bypass',
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers,
  },
};

export const decorators = [
  (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        {Story()}
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    );
  },
  mswDecorator,
];
