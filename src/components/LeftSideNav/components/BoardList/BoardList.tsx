import { AllBoardsResponseDto } from '../../../../api/board/dto/response/AllBoardsResponse.dto';
import BoardLink from '../BoardLink/BoardLink';
import styles from './BoardList.module.scss';

interface BoardListProps {
  allBoards: AllBoardsResponseDto;
}

const BoardList: React.FC<BoardListProps> = ({ allBoards }) => {
  return (
    <div className={styles.board__list__wrapper} data-testid="board-list-wrapper">
      <div className={styles.board__list__container} id="#board__list__container">
        {allBoards.map((board) => (
          <BoardLink key={board.board_id} title={board.title} board_id={board.board_id} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
