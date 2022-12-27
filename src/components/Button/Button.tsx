/* eslint-disable react/button-has-type */
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style: React.CSSProperties;
  variant?: 'primary' | 'secondary';
  destructive?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  style,
  variant = 'primary',
  destructive = false,
  children,
  ...restProps
}) => {
  return (
    <button
      style={style}
      className={`${styles.button} ${styles[variant]} ${destructive ? styles.destructive : ''}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
