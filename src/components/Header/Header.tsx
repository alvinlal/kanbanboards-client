import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import Search from '../Search/Search';
import { useHeader } from './hooks/useHeader';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  authenticated: boolean;
  boardPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ authenticated, boardPage, ...restProps }) => {
  const { logOut, toggleLeftSideNav } = useHeader();
  const navigate = useNavigate();

  return (
    <header className={styles.header} {...restProps}>
      <div className={styles.logo__title}>
        <Logo
          height={42}
          width={42}
          className={boardPage ? styles.logo : ''}
          onClick={() => navigate('/')}
          cursor="pointer"
        />
        {boardPage && (
          <Bars3Icon
            height={48}
            width={38}
            className={styles.hamburger__bars}
            onClick={toggleLeftSideNav}
          />
        )}
        <h4>KanbanBoards</h4>
      </div>
      <div className={styles.header__search}>{boardPage && <Search />}</div>
      <nav>
        {authenticated ? (
          <>
            {!boardPage && <Link to="/allboards">Your Boards</Link>}
            <button className={boardPage ? styles.logout__btn : ''} onClick={logOut} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link tabIndex={0} to="/signup">
              Signup
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
