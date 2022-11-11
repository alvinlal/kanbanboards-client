import { ResponseComposition, RestContext, RestRequest } from 'msw';

export default {
  LOADING: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.delay('infinite')),
  500: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(
      ctx.status(500),
      ctx.json({
        statusCode: 500,
        message: 'Internal server error',
      })
    ),
  ERR_NETWORK: (_: RestRequest, res: ResponseComposition) =>
    res.networkError('failed to connect'),
};
