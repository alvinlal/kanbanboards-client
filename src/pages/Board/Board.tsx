import LeftSideNav from '../../components/LeftSideNav/LeftSideNav';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
      <LeftSideNav />
      This is Board page
    </div>
  );
};

export default Board;
