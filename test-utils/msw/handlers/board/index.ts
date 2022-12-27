import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { boardController } from './controllers/boardController';

const boardHandlers = [rest.get(apiEndPoint('/boards/all'), boardController[200])];

export default boardHandlers;
