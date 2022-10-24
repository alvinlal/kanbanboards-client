import { rest } from 'msw';
import { apiEndPoint } from '../baseUrls';

const boardHandlers = [
  rest.get(apiEndPoint('/board/:aedbd643d45d6g66ad'), (_, res, ctx) => {
    return res(ctx.json({}));
  }),
];

export default boardHandlers;
