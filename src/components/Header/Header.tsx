import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import Search from '../Search/Search';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  authenticated: boolean;
  boardPage: boolean;
}

const Header: React.FC<HeaderProps> = ({
  authenticated,
  boardPage,
  ...restProps
}) => {
  return (
    <header className={styles.header} {...restProps}>
      <div className={styles.logo__title}>
        <Logo height={48} width={48} className={boardPage ? styles.logo : ''} />
        {boardPage && (
          <Bars3Icon
            height={48}
            width={38}
            className={styles.hamburger__bars}
          />
        )}
        <h3>KanbanBoards</h3>
      </div>
      <div className={styles.header__search}>{boardPage && <Search />}</div>
      <nav>
        {authenticated ? (
          <>
            {!boardPage && <Link to="/allboards">Your Boards</Link>}
            <button
              className={boardPage ? styles.logout__btn : ''}
              onClick={() => {}}
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signup">Signup</Link>
            <Link to="/auth/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
