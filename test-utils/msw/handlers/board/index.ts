import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { AllboardsController } from './controllers/AllboardsController';

const boardHandlers = [rest.get(apiEndPoint('/boards/all'), AllboardsController[200])];

export default boardHandlers;
