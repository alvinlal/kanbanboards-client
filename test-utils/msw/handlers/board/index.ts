import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import board from './controllers/board';

const boardHandlers = [
  rest.get(apiEndPoint('/board/:aedbd643d45d6g66ad'), board[200]),
];

export default boardHandlers;
