import {
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Button from '../Button/Button';
import BoardList from './components/BoardList/BoardList';
import { useLeftSideNav } from './hooks/useLeftSideNav';
import styles from './LeftSideNav.module.scss';

const LeftSideNav: React.FC = () => {
  const {
    LoadingBlocks,
    isLoading,
    isError,
    allBoards,
    isLeftSideNavOpen,
    toggleLeftSideNav,
    logOut,
  } = useLeftSideNav();

  return (
    <div className={styles.left__side__nav} style={{ left: isLeftSideNavOpen ? 0 : '-100%' }}>
      <div>
        <div className={styles.heading}>
          <h6>All Boards</h6>
          <PlusIcon width={32} height={32} strokeWidth={2} onClick={toggleLeftSideNav} />
        </div>
        {isLoading && <div> {LoadingBlocks}</div>}
        {isError && (
          <div className={styles.error}>
            <ExclamationTriangleIcon width={28} height={28} />
            <p>Something went wrong !</p>
          </div>
        )}
        {allBoards && <BoardList allBoards={allBoards} />}
      </div>
      <div>
        <div className={styles.logout__btn}>
          <Button
            style={{ height: '64px', width: '100%', justifyContent: 'space-between' }}
            onClick={logOut}
          >
            <h6>Logout</h6>
            <ArrowRightOnRectangleIcon width={32} height={32} strokeWidth={2} />
          </Button>
        </div>
        <Button
          style={{ height: '64px', width: '100%', justifyContent: 'space-between', zIndex: 10 }}
        >
          <h6>New Board</h6>
          <PlusIcon width={32} height={32} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};

export default LeftSideNav;
