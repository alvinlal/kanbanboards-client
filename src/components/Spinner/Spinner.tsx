import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';
import styles from './Spinner.module.scss';

type SpinnerProps = React.SVGAttributes<SVGElement>;

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <SpinnerIcon {...props} className={styles.spinner} data-testid="spinner" />
  );
};

export default Spinner;
