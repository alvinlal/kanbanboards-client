import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { apiEndPoint } from '../../../test-utils/msw/baseUrls';
import Search from './Search';
import defaultHandlers from '../../../test-utils/msw/defaultHandlers';

export default {
  title: 'Components/Search',
  component: Search,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#4174fa',
          width: '100%',
          height: '88px',
          paddingTop: '20px',
          paddingLeft: '60px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Search>;

export const Default: ComponentStory<typeof Search> = () => (
  <MemoryRouter>
    <Search />
  </MemoryRouter>
);

export const Loading: ComponentStory<typeof Search> = () => (
  <MemoryRouter>
    <Search />
  </MemoryRouter>
);

Loading.parameters = {
  msw: {
    handlers: [rest.get(apiEndPoint('/search'), defaultHandlers.LOADING)],
  },
};

Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('textbox'), 'my project');
};

export const WithResults: ComponentStory<typeof Search> = () => (
  <MemoryRouter>
    <Search />
  </MemoryRouter>
);

WithResults.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('textbox'), 'my project');
};

export const NoResults: ComponentStory<typeof Search> = () => (
  <MemoryRouter>
    <Search />
  </MemoryRouter>
);

NoResults.parameters = {
  msw: {
    handlers: [
      rest.get(apiEndPoint('/search'), (_, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};

NoResults.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('textbox'), 'my project');
};
