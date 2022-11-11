import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    state: {
      options: ['default', 'hovered', 'active', 'disabled', 'destructive'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
  width: '130px',
  height: '50px',
  destructive: false,
  children: (
    <>
      <p style={{ fontSize: '20px' }}>Primary</p>
      <ArrowRightIcon height={26} width={26} />
    </>
  ),
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
  width: '200px',
  height: '50px',
  destructive: false,
  children: (
    <>
      <p style={{ fontSize: '20px' }}>Secondary</p>
      <ArrowRightIcon height={26} width={26} />
    </>
  ),
};

export const Destructive = Template.bind({});

Destructive.args = {
  variant: 'primary',
  width: '150px',
  height: '50px',
  destructive: true,
  children: (
    <>
      <p style={{ fontSize: '20px' }}>Delete</p>
      <ArrowRightIcon height={26} width={26} />
    </>
  ),
};
