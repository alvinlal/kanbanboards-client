/*
  Requirements:-
  1. Should display loading spinner while results are loading
  2. Should hide loading spinner after results have loaded
  3. Should display search results correctly
  4. Should display 'No Results!' when there is no results
  5. Should go to correct url while clicking a search result
  6. Should hide search results on blur
  7. Should show search results on focus
  9. Should match snapshot
  8. Should match api request loading snapshot
  10. Should match api request finished snapshot
*/

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import renderer from 'react-test-renderer';
import Search from '../../Search';
import { server, rest } from '../../../../../test-utils/msw/server';
import { apiEndPoint } from '../../../../../test-utils/msw/baseUrls';

describe('Search.tsx', () => {
  // setup
  const loadingSpinnerTestId = 'spinner';
  const searchResultContainerTestId = `search-result-container`;

  const typeIntoSearch = (query: string) => {
    const queryInputElement = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(queryInputElement, query);

    return queryInputElement;
  };

  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedNavigate,
    }));
  });

  // tests
  it('Should display loading spinner while results are loading', async () => {
    let loadingSpinner = screen.queryByTestId(loadingSpinnerTestId);
    expect(loadingSpinner).not.toBeInTheDocument();

    server.use(
      rest.post(apiEndPoint('/search'), async (_, res, ctx) => {
        return res(ctx.delay('infinite'));
      })
    );

    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    loadingSpinner = await screen.findByTestId(loadingSpinnerTestId);
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('Should hide loading spinner after results have loaded', async () => {
    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(loadingSpinnerTestId)
      ).not.toBeInTheDocument();
    });
  });

  it('Should display search results correctly', async () => {
    const results = [
      { title: 'my project 1', _id: faker.datatype.uuid() },
      { title: 'my project 2', _id: faker.datatype.uuid() },
      { title: 'my project 3', _id: faker.datatype.uuid() },
    ];

    server.use(
      rest.post(apiEndPoint('/search'), async (_, res, ctx) => {
        return res(ctx.json(results));
      })
    );

    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    const allSearchResults = await screen.findAllByRole('link');

    expect(allSearchResults).toHaveLength(results.length);
  });

  it("Should display 'No Results!' when there is no results", async () => {
    server.use(
      rest.post(apiEndPoint('/search'), async (_, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    const noResultsFound = await screen.findByText('No Results !');

    expect(noResultsFound).toBeInTheDocument();
  });

  it('Should go to correct url while clicking a search result', async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _id = faker.datatype.uuid();
    const pathname = `/board/${_id}`;
    server.use(
      rest.post(apiEndPoint('/search'), async (_, res, ctx) => {
        return res(
          ctx.json([
            {
              title: 'my project',
              _id,
            },
          ])
        );
      })
    );

    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <Search />
      </Router>
    );

    act(() => {
      typeIntoSearch('project 1');
    });

    await userEvent.click(await screen.findByRole('link'));

    expect(history.push).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname,
      }),
      undefined,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
      }
    );
  });

  it('Should hide search results on blur', async () => {
    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    expect(
      await screen.findByTestId(searchResultContainerTestId)
    ).toBeInTheDocument();

    fireEvent.blur(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(
        screen.queryByTestId(searchResultContainerTestId)
      ).not.toBeInTheDocument();
    });
  });

  it('Should show search results on focus', async () => {
    render(<Search />, { wrapper: BrowserRouter });

    act(() => {
      typeIntoSearch('my project');
    });

    fireEvent.blur(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(
        screen.queryByTestId(searchResultContainerTestId)
      ).not.toBeInTheDocument();
    });
    fireEvent.focus(screen.getByRole('textbox'));
    expect(
      await screen.findByTestId(searchResultContainerTestId)
    ).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = renderer.create(<Search />);
    expect(tree).toMatchSnapshot();
  });

  it('Should match api request loading snapshot', async () => {
    server.use(
      rest.post(apiEndPoint('/search'), (_, res, ctx) => {
        return res(ctx.delay('infinite'));
      })
    );

    const { asFragment } = render(<Search />, {
      wrapper: BrowserRouter,
    });

    act(() => {
      typeIntoSearch('my project');
    });

    await screen.findByTestId(loadingSpinnerTestId);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should match api request finished snapshot', async () => {
    const { asFragment } = render(<Search />, {
      wrapper: BrowserRouter,
    });

    act(() => {
      typeIntoSearch('my project');
    });

    await screen.findAllByRole('link');

    expect(asFragment()).toMatchSnapshot();
  });
});