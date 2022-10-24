import { rest } from 'msw';
import { apiEndPoint } from '../baseUrls';

const authHandlers = [
  rest.post(apiEndPoint('/auth/signup'), (_, res, ctx) => {
    return res(ctx.json({}));
  }),
];

export default authHandlers;
