import '../src/index.scss';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import handlers from '../test-utils/msw/handlers';

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

export const decorators = [mswDecorator];
