import { RestRequest, ResponseComposition, RestContext } from 'msw';

export const boardController = {
  200: (_: RestRequest, res: ResponseComposition, ctx: RestContext) => res(ctx.json({})),
};
