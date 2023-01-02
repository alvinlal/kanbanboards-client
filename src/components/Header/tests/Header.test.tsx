/**
 * Requirements:-
 * 1. Should show only signup and login links while unauthenticated
 * 2. Should show only your boards and logout links while authenticated
 * 3. Should show only logout link and search bar while on board page
 * 4. Should open nav while clicking on hamburger menu on mobile
 * 5. Should match snapshot for authenticated user
 * 6. Should match snapshot for unauthenticated user
 * 7. Should match snapshot for board page
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { RQWrapper } from '../../../react-query/RQWrapper';
import Header from '../Header';

describe('Header.tsx', () => {
  const getHeaderLinks = () => {
    const signUpLink = screen.queryByRole('link', {
      name: 'Signup',
    });
    const loginLink = screen.queryByRole('link', {
      name: 'Login',
    });
    const logoutLink = screen.queryByRole('button', {
      name: 'Logout',
    });
    const yourBoardsLink = screen.queryByRole('link', {
      name: 'Your Boards',
    });

    return {
      signUpLink,
      loginLink,
      logoutLink,
      yourBoardsLink,
    };
  };

  it('Should show only signup and login links while unauthenticated', () => {
    render(
      <MemoryRouter>
        <Header authenticated={false} boardPage={false} />
      </MemoryRouter>,
      {
        wrapper: RQWrapper,
      }
    );

    const { signUpLink, loginLink, logoutLink, yourBoardsLink } = getHeaderLinks();
    const searchBar = screen.queryByRole('searchbox');

    expect(signUpLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(logoutLink).not.toBeInTheDocument();
    expect(yourBoardsLink).not.toBeInTheDocument();
    expect(searchBar).not.toBeInTheDocument();
  });

  it('Should show only your boards and logout links while authenticated', () => {
    render(
      <MemoryRouter>
        <Header authenticated boardPage={false} />
      </MemoryRouter>,
      {
        wrapper: RQWrapper,
      }
    );

    const { signUpLink, loginLink, logoutLink, yourBoardsLink } = getHeaderLinks();
    const searchBar = screen.queryByRole('searchbox');
    expect(logoutLink).toBeInTheDocument();
    expect(yourBoardsLink).toBeInTheDocument();
    expect(signUpLink).not.toBeInTheDocument();
    expect(loginLink).not.toBeInTheDocument();
    expect(searchBar).not.toBeInTheDocument();
  });

  it('Should show only logout link and search bar while on board page', () => {
    render(
      <MemoryRouter>
        <Header authenticated boardPage />
      </MemoryRouter>,
      {
        wrapper: RQWrapper,
      }
    );

    const { signUpLink, loginLink, logoutLink, yourBoardsLink } = getHeaderLinks();
    const searchBar = screen.queryByRole('searchbox');

    expect(logoutLink).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
    expect(signUpLink).not.toBeInTheDocument();
    expect(loginLink).not.toBeInTheDocument();
    expect(yourBoardsLink).not.toBeInTheDocument();
  });

  it('Should match snapshot for authenticated user', () => {
    const tree = renderer.create(
      <RQWrapper>
        <MemoryRouter>
          <Header authenticated boardPage={false} />
        </MemoryRouter>
      </RQWrapper>
    );
    expect(tree).toMatchSnapshot();
  });

  it('Should match snapshot for unauthenticated user', () => {
    const tree = renderer.create(
      <RQWrapper>
        <MemoryRouter>
          <Header authenticated={false} boardPage={false} />
        </MemoryRouter>
      </RQWrapper>
    );
    expect(tree).toMatchSnapshot();
  });

  it('Should match snapshot for board page', () => {
    const tree = renderer.create(
      <RQWrapper>
        <MemoryRouter>
          <Header authenticated boardPage />
        </MemoryRouter>
      </RQWrapper>
    );
    expect(tree).toMatchSnapshot();
  });
});
