import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextField from './TextField';

export default {
  title: 'Components/Inputs/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  error: false,
  type: 'text',
  placeholder: 'email',
};

export const Error = Template.bind({});

Error.args = {
  error: true,
  type: 'text',
  placeholder: 'email',
};
