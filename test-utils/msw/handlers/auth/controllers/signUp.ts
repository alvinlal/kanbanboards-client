import { ResponseComposition, RestContext, RestRequest } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import user from '../../../../mocks/user.json';

export default {
  ...defaultHandlers,
  200: async (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({ _id: user._id })),
  400: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(
      ctx.status(400),
      ctx.json({
        statusCode: 400,
        message: [
          {
            property: 'email',
            constraints: {
              IsEmailExists: 'Account already exists, please login',
            },
          },
        ],
        error: 'Bad Request',
      })
    ),
};
