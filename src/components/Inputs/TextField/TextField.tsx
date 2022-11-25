import { forwardRef } from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ error = false, ...restProps }, ref) {
    return (
      <input
        ref={ref}
        className={`${styles.textfield} ${error ? styles.error : null}`}
        {...restProps}
      />
    );
  }
);

export default TextField;
