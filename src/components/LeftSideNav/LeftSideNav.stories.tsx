import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { apiEndPoint } from '../../../test-utils/msw/baseUrls';
import defaultHandlers from '../../../test-utils/msw/defaultHandlers';
import LeftSideNavigation from './LeftSideNav';

export default {
  title: 'Components/LeftSideNav',
  component: LeftSideNavigation,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof LeftSideNavigation>;

export const Default: ComponentStory<typeof LeftSideNavigation> = () => (
  <MemoryRouter>
    <LeftSideNavigation />
  </MemoryRouter>
);

export const Loading: ComponentStory<typeof LeftSideNavigation> = () => (
  <MemoryRouter>
    <LeftSideNavigation />
  </MemoryRouter>
);

Loading.parameters = {
  msw: {
    handlers: [rest.get(apiEndPoint('/boards/all'), defaultHandlers.LOADING)],
  },
};

export const Empty: ComponentStory<typeof LeftSideNavigation> = () => (
  <MemoryRouter>
    <LeftSideNavigation />
  </MemoryRouter>
);

Empty.parameters = {
  msw: {
    handlers: [
      rest.get(apiEndPoint('/boards/all'), (_, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};

export const Error: ComponentStory<typeof LeftSideNavigation> = () => (
  <MemoryRouter>
    <LeftSideNavigation />
  </MemoryRouter>
);

Error.parameters = {
  msw: {
    handlers: [rest.get(apiEndPoint('/boards/all'), defaultHandlers[500])],
  },
};
