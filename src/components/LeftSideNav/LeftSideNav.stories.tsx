import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
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

export const LeftSideNav: ComponentStory<typeof LeftSideNavigation> = () => (
  <MemoryRouter>
    <LeftSideNavigation />
  </MemoryRouter>
);

LeftSideNav.storyName = 'LeftSideNav';
