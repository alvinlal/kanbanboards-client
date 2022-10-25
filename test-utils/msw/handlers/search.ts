import { rest } from 'msw';
import { apiEndPoint } from '../baseUrls';
import searchResults from '../../mocks/searchResults.json';

const searchHandlers = [
  // migrate to get (remember to URLencode search query)
  rest.get(apiEndPoint('/search'), (req, res, ctx) => {
    return res(ctx.delay(300), ctx.json(searchResults));
  }),
];

export default searchHandlers;
