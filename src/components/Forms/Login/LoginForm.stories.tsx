import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LogInForm from './LoginForm';

export default {
  title: 'Components/Forms/LoginForm',
  component: LogInForm,
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
        <div style={{ width: '400px' }}>
          {' '}
          <Story />
        </div>
      </div>
    ),
  ],
} as ComponentMeta<typeof LogInForm>;

export const LoginForm: ComponentStory<typeof LogInForm> = () => (
  <MemoryRouter>
    <LogInForm />
  </MemoryRouter>
);
