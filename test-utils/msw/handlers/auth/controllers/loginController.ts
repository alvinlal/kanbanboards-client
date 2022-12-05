import { ResponseComposition, RestContext, RestRequest } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import { userStub } from '../../../../stubs/user.stub';

export const loginController = {
  ...defaultHandlers,
  200: async (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({ _id: userStub()._id })),
  401: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(
      ctx.status(400),
      ctx.json({
        statusCode: 401,
        message: 'incorrect email or password',
        error: 'Unauthorized',
      })
    ),
};
