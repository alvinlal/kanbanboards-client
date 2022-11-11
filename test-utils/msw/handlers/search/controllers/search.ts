import { RestRequest, ResponseComposition, RestContext } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import searchResults from '../../../../mocks/searchResults.json';

export default {
  ...defaultHandlers,
  200: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.delay(300), ctx.json(searchResults)),
};
