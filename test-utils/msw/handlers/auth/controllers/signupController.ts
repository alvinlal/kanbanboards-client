import { ResponseComposition, RestContext, RestRequest } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import { userStub } from '../../../../stubs/user.stub';

export const signupController = {
  ...defaultHandlers,
  200: async (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({ _id: userStub()._id })),
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
