import styles from './Button.module.scss';

interface ButtonProps {
  height?: string;
  width?: string;
  variant?: 'primary' | 'secondary';
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  height = 'auto',
  width = 'auto',
  variant = 'primary',
  destructive = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      style={{ width, height }}
      className={`${styles.button} ${styles[variant]} ${
        destructive ? styles.destructive : ''
      } }`}
    >
      {children}
    </button>
  );
};

export default Button;
