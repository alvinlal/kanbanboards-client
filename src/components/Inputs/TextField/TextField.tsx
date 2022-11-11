import { forwardRef } from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps {
  error?: boolean;
  type: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { type, error = false, placeholder, onChange, onBlur },
    ref
  ) {
    return (
      <input
        ref={ref}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`${styles.textfield} ${error ? styles.error : null}`}
      />
    );
  }
);

export default TextField;
