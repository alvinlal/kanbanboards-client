import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

interface HeaderProps {
  authenticated: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo__title}>
        <Logo height={48} width={48} />
        <h3>KanbanBoards</h3>
      </div>
    </header>
  );
};

export default Header;
