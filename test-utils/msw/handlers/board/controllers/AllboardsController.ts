import { RestRequest, ResponseComposition, RestContext } from 'msw';
import { allBoardsResponse } from '../../../../stubs/allBoardsResponse.stub';
import defaultHandlers from '../../../defaultHandlers';

export const AllboardsController = {
  ...defaultHandlers,
  200: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.json(allBoardsResponse)),
  EMPTY: (_: RestRequest, res: ResponseComposition, ctx: RestContext) => res(ctx.json([])),
};
