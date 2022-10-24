import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  width?: string;
  height?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  width = '24px',
  height = '24px',
}) => {
  return (
    <SpinnerIcon
      className={styles.spinner}
      width={width}
      height={height}
      data-testid="spinner"
    />
  );
};

export default Spinner;
