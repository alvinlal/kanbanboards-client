import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof Button>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
  children: 'primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
  children: 'secondary',
};

export const Success = Template.bind({});

Success.args = {
  variant: 'success',
  children: 'success',
};

export const Danger = Template.bind({});

Danger.args = {
  variant: 'danger',
  children: 'danger',
};
