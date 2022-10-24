import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const UnAuthenticated = Template.bind({});

UnAuthenticated.args = {
  authenticated: false,
};

export const Authenticated = Template.bind({});

Authenticated.args = {
  authenticated: true,
};
