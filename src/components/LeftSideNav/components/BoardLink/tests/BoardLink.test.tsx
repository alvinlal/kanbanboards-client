import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import BoardLink from '../BoardLink';

describe('BoardLink.tsx', () => {
  it('should display board title', () => {
    render(
      <MemoryRouter>
        <BoardLink title="my board" _id="123" />
      </MemoryRouter>
    );
    expect(screen.getByText('my board')).toBeInTheDocument();
  });

  it('should open dropdown menu on clicking ellipse icon', async () => {
    render(
      <MemoryRouter>
        <BoardLink title="my board" _id="123" />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('board-dropdown-wrapper')).not.toBeVisible();
    await fireEvent.click(screen.getByTestId('toggle-dropdown'));
    expect(await screen.findByTestId('board-dropdown-wrapper')).toBeVisible();
  });

  it('should close dropdown on clicking on the elipse while the dropdown is visible', async () => {
    render(
      <MemoryRouter>
        <BoardLink title="my board" _id={faker.datatype.uuid()} />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('board-dropdown-wrapper')).not.toBeVisible();
    await fireEvent.click(screen.getByTestId('toggle-dropdown'));
    expect(await screen.findByTestId('board-dropdown-wrapper')).toBeVisible();
    await fireEvent.click(screen.getByTestId('toggle-dropdown'));
    expect(await screen.findByTestId('board-dropdown-wrapper')).not.toBeVisible();
  });

  it('should close dropdown on blur', async () => {
    render(
      <MemoryRouter>
        <BoardLink title="my board" _id={faker.datatype.uuid()} />
      </MemoryRouter>
    );
    await fireEvent.click(screen.getByTestId('toggle-dropdown'));
    expect(await screen.findByTestId('board-dropdown-wrapper')).toBeVisible();
    await fireEvent.blur(screen.getByTestId('board-dropdown-wrapper'));
    expect(await screen.findByTestId('board-dropdown-wrapper')).not.toBeVisible();
  });

  it('should navigate to correct board on click', async () => {
    const _id = faker.datatype.uuid();
    const pathname = `/board/${_id}`;

    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <BoardLink title="my board" _id={_id} />
      </Router>
    );

    await userEvent.click(await screen.findByRole('link'));

    expect(history.push).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname,
      }),
      undefined,
      {}
    );
  });
});
