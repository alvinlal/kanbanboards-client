import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { boardController } from './controllers/boardController';

const boardHandlers = [rest.get(apiEndPoint('/board/:aedbd643d45d6g66ad'), boardController[200])];

export default boardHandlers;
