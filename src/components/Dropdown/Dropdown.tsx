import React from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: {
    title: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent) => void;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ options, ...restProps }) => {
  return (
    <div className={styles.dropdown} {...restProps}>
      {options.map((option) => (
        <div
          className={styles.dropdown__option}
          key={option.title}
          onClick={option.onClick}
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="option"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.code === 'Enter') option.onClick(e);
          }}
        >
          {option.title}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
