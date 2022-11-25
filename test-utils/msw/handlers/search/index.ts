import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { searchController } from './controllers/searchController';

const searchHandlers = [
  rest.get(apiEndPoint('/search'), searchController[200]),
];

export default searchHandlers;
