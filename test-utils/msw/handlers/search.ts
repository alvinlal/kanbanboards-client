import { rest } from 'msw';
import { apiEndPoint } from '../baseUrls';
import searchResults from '../../mocks/searchResults.json';

const searchHandlers = [
  rest.get(apiEndPoint('/search'), (req, res, ctx) => {
    return res(ctx.delay(300), ctx.json(searchResults));
  }),
];

export default searchHandlers;
