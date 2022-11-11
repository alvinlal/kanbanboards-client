import { RestRequest, ResponseComposition, RestContext } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import user from '../../../../mocks/user.json';

export default {
  ...defaultHandlers,
  200: async (req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({ _id: user._id })),
  401: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(
      ctx.status(401),
      ctx.json({ statusCode: 401, message: 'Unauthorized' })
    ),
};
