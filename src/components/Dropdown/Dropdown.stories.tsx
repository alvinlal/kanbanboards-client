import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownMenu from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: DropdownMenu,
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
} as ComponentMeta<typeof DropdownMenu>;

export const Dropdown: ComponentStory<typeof DropdownMenu> = () => (
  <DropdownMenu
    options={[
      { title: 'option one', onClick: () => {} },
      { title: 'option two', onClick: () => {} },
      { title: 'option three', onClick: () => {} },
      { title: 'option four', onClick: () => {} },
    ]}
  />
);
