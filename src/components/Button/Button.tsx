/* eslint-disable react/button-has-type */
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height?: string;
  width?: string;
  variant?: 'primary' | 'secondary';
  destructive?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  height = 'auto',
  width = 'auto',
  variant = 'primary',
  destructive = false,
  children,
  ...restProps
}) => {
  return (
    <button
      style={{ width, height }}
      className={`${styles.button} ${styles[variant]} ${destructive ? styles.destructive : ''}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
