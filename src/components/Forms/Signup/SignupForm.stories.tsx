import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpForm from './SignupForm';

export default {
  title: 'Components/Forms/SignupForm',
  component: SignUpForm,
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
} as ComponentMeta<typeof SignUpForm>;

export const SignupForm: ComponentStory<typeof SignUpForm> = () => (
  <MemoryRouter>
    <SignUpForm />
  </MemoryRouter>
);
