import { RestRequest, ResponseComposition, RestContext } from 'msw';
import defaultHandlers from '../../../defaultHandlers';
import { searchResultsStub } from '../../../../stubs/searchResults.stub';

export const searchController = {
  ...defaultHandlers,
  200: (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
    res(ctx.delay(300), ctx.json(searchResultsStub())),
};
