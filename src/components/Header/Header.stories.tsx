import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);

export const BoardPage = Template.bind({});

BoardPage.storyName = 'In Board Page';

BoardPage.args = {
  authenticated: true,
  boardPage: true,
};

export const OtherPagesAuthenticated = Template.bind({});
OtherPagesAuthenticated.storyName = 'Authenticated user in all other pages';

OtherPagesAuthenticated.args = {
  authenticated: true,
  boardPage: false,
};

export const OtherPageUnAuthenticated = Template.bind({});
OtherPageUnAuthenticated.storyName = 'UnAuthenticated user in all other pages';

OtherPageUnAuthenticated.args = {
  authenticated: false,
  boardPage: false,
};
