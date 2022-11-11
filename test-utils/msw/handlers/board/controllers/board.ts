import { RestRequest, ResponseComposition, RestContext } from 'msw';

export default {
  200: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json({})),
};
