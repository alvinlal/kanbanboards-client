import styles from './Button.module.scss';

export interface IButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
}: IButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
