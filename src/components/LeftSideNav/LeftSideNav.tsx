/* eslint-disable no-nested-ternary */
import {
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import Button from '../Button/Button';
import SkeletonBlock from '../SkeletonBlock/SkeletonBlock';
import BoardList from './components/BoardList/BoardList';
import { useAllBoards } from './hooks/useAllBoards';
import { useLeftSideNav } from './hooks/useLeftSideNav';
import styles from './LeftSideNav.module.scss';

const LeftSideNav: React.FC = () => {
  const { isLeftSideNavOpen, toggleLeftSideNav, logOut } = useLeftSideNav();
  const { allBoards, isLoading, isError } = useAllBoards();

  const LoadingBlocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < 6; i += 1) {
      blocks.push(<SkeletonBlock width="200px" height="30px" key={i} />);
    }
    return blocks;
  }, []);

  return (
    <div className={styles.left__side__nav} style={{ left: isLeftSideNavOpen ? 0 : '-100%' }}>
      <div>
        <div className={styles.heading}>
          <h6>All Boards</h6>
          <PlusIcon width={32} height={32} strokeWidth={2} onClick={toggleLeftSideNav} />
        </div>
        {isLoading && <div data-testid="skeleton-blocks"> {LoadingBlocks}</div>}
        {isError && (
          <div className={styles.error}>
            <ExclamationTriangleIcon width={28} height={28} />
            <p>Something went wrong !</p>
          </div>
        )}
        {allBoards ? (
          allBoards.length ? (
            <BoardList allBoards={allBoards} />
          ) : (
            <p className={styles.no__boards}>No boards found</p>
          )
        ) : null}
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
