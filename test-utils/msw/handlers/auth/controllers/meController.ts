import { RestRequest, ResponseComposition, RestContext } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import { userStub } from '../../../../stubs/user.stub';

export const meController = {
  ...defaultHandlers,
  200: (req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({ _id: userStub()._id })),
  401: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(
      ctx.status(401),
      ctx.json({ statusCode: 401, message: 'Unauthorized' })
    ),
};
