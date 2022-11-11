import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import search from './controllers/search';

const searchHandlers = [rest.get(apiEndPoint('/search'), search[200])];

export default searchHandlers;
