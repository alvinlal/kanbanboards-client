import { useNavigate } from 'react-router-dom';
import { AllBoardsResponse } from '../../../../api/board/dto/response/AllBoardsResponse.dto';
import BoardLink from '../BoardLink/BoardLink';
import styles from './BoardList.module.scss';

interface BoardListProps {
  allBoards: AllBoardsResponse;
}

const BoardList: React.FC<BoardListProps> = ({ allBoards }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.board__list__wrapper}>
      <div className={styles.board__list__container} id="#board__list__container">
        {allBoards.map((board) => (
          <BoardLink
            key={board._id}
            title={board.title}
            _id={board._id}
            onClick={() => navigate(`/board/${board._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
