/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Should show  error on empty email input
 * Should show error on empty password input
 * Should show error on incorrect credentials
 * Login button should be disabled if there are errors
 * Should show loading spinner on clicking login
 * Should not show any errors if all the fields are valid
 * Should navigate user to home page after successfull login
 * Should match snapshot
 * Should match loading snapshot
 * Should match error snapshot
 */

import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Router } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { createMemoryHistory } from 'history';
import { rest, server } from '../../../../../test-utils/msw/server';
import { LoginFormInputs } from '../hooks/useLoginForm';
import LoginForm from '../LoginForm';
import { RQWrapper } from '../../../../react-query/RQWrapper';
import { apiEndPoint } from '../../../../../test-utils/msw/baseUrls';
import defaultHandlers from '../../../../../test-utils/msw/defaultHandlers';
import { loginController } from '../../../../../test-utils/msw/handlers/auth/controllers/loginController';

describe('LoginForm.tsx', () => {
  const typeIntoForm = async ({ email, password }: Partial<LoginFormInputs>) => {
    const user = userEvent.setup();
    const emailInputElement = screen.getByLabelText('email') as HTMLInputElement;

    const passwordInputElement = screen.getByLabelText('password') as HTMLInputElement;

    if (email) {
      await user.type(emailInputElement, email);
    }

    if (password) {
      await user.type(passwordInputElement, password);
    }

    return {
      emailInputElement,
      passwordInputElement,
    };
  };

  const clickOnLoginButton = async () => {
    const loginButtonElement = screen.getByRole('button', {
      name: /LOGIN/i,
    }) as HTMLButtonElement;
    await userEvent.click(loginButtonElement);
    return loginButtonElement;
  };

  const clickOnGoogleButton = async () => {
    const googleButtonElement = screen.getByRole('button', {
      name: /CONTINUE WITH GOOGLE/i,
    }) as HTMLButtonElement;
    await userEvent.click(googleButtonElement);
    return googleButtonElement;
  };

  describe('Should show email errors', () => {
    describe('when email is empty', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <LoginForm />
          </MemoryRouter>,
          {
            wrapper: RQWrapper,
          }
        );

        const { emailInputElement } = await typeIntoForm({
          email: faker.internet.email(),
        });
        await userEvent.clear(emailInputElement);
        const emailIsRequiredErrorElement = await screen.findByText(/please enter your email/i);
        expect(emailIsRequiredErrorElement).toBeInTheDocument();
      });
    });

    describe('when email or password is incorrect', () => {
      it('should show correct error message', async () => {
        server.use(rest.post(apiEndPoint('/auth/login'), loginController[401]));
        render(
          <MemoryRouter>
            <LoginForm />
          </MemoryRouter>,
          {
            wrapper: RQWrapper,
          }
        );

        await typeIntoForm({
          email: faker.internet.email(),
          password: faker.internet.password(6),
        });

        await clickOnLoginButton();
        const incorrectCredentialsErrorElement = await screen.findByText(
          'incorrect email or password'
        );
        expect(incorrectCredentialsErrorElement).toBeInTheDocument();
      });
    });
  });

  describe('Should show password errors', () => {
    describe('when password is empty', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <LoginForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { passwordInputElement } = await typeIntoForm({
          password: faker.internet.password(),
        });
        await userEvent.clear(passwordInputElement);
        const passwordIsRequiredErrorElement = await screen.findByText(
          /please enter your password/i
        );
        expect(passwordIsRequiredErrorElement).toBeInTheDocument();
      });
    });
  });
  describe('Should show correct button states for signup button', () => {
    describe('when there is no errors', () => {
      it('signup button should not be disabled', async () => {
        render(
          <MemoryRouter>
            <LoginForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );

        await typeIntoForm({ email: faker.internet.email(), password: faker.internet.password(6) });
        const loginButtonElement = await clickOnLoginButton();
        await waitFor(() => {
          expect(loginButtonElement.disabled).toBe(false);
        });
      });
    });

    describe('when there are errors', () => {
      it('signup button should be disabled', async () => {
        render(
          <MemoryRouter>
            <LoginForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );

        await typeIntoForm({ email: faker.internet.email() });
        const loginButtonElement = await clickOnLoginButton();
        await waitFor(() => {
          expect(loginButtonElement.disabled).toBe(true);
        });
      });
    });

    describe('Should navigate user to the correct destination after successfull login', () => {
      describe('when login button is clicked with correct form inputs', () => {
        it('should navigate user to home page', async () => {
          const history = createMemoryHistory();
          history.push = jest.fn();

          render(
            <Router location={history.location} navigator={history}>
              <LoginForm />
            </Router>,
            { wrapper: RQWrapper }
          );

          await typeIntoForm({
            email: faker.internet.email(),
            password: faker.internet.password(6),
          });

          await clickOnLoginButton();

          expect(history.push).toHaveBeenCalledWith(
            { pathname: '/', search: '', hash: '' },
            undefined,
            {}
          );
        });

        it('should show loading spinner in login button', async () => {
          server.use(rest.post(apiEndPoint('/auth/login'), defaultHandlers.LOADING));
          render(
            <MemoryRouter>
              <LoginForm />
            </MemoryRouter>,
            { wrapper: RQWrapper }
          );

          await typeIntoForm({
            email: faker.internet.email(),
            password: faker.internet.password(6),
          });
          await clickOnLoginButton();
          const spinner = await screen.findByTestId('spinner');
          expect(spinner).toBeInTheDocument();
        });

        it('login button should be disabled while signup api request is loading', async () => {
          server.use(rest.post(apiEndPoint('/auth/login'), defaultHandlers.LOADING));
          render(
            <MemoryRouter>
              <LoginForm />
            </MemoryRouter>,
            { wrapper: RQWrapper }
          );

          await typeIntoForm({
            email: faker.internet.email(),
            password: faker.internet.password(6),
          });
          const signupButtonElement = await clickOnLoginButton();
          await waitFor(() => {
            expect(signupButtonElement.disabled).toBe(true);
          });
        });
      });

      describe('when continue with google button is clicked', () => {
        it('should navigate user to correct url', async () => {
          const assignMock = jest.fn();

          // @ts-ignore
          delete window.location;
          // @ts-ignore
          window.location = { assign: assignMock };

          render(
            <MemoryRouter>
              <LoginForm />
            </MemoryRouter>,
            { wrapper: RQWrapper }
          );

          await clickOnGoogleButton();
          expect(window.location.href).toBe(`${import.meta.env.VITE_API_ENDPOINT}/auth/google`);
        });
      });
    });
  });

  describe('Should match snapshots', () => {
    it("match's default snapshot", () => {
      const tree = renderer.create(
        <MemoryRouter>
          <RQWrapper>
            <LoginForm />
          </RQWrapper>
        </MemoryRouter>
      );
      expect(tree).toMatchSnapshot();
    });

    it("match's loading state snapshot", async () => {
      server.use(rest.post(apiEndPoint('/auth/login'), defaultHandlers.LOADING));
      const { asFragment } = render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
        {
          wrapper: RQWrapper,
        }
      );

      await typeIntoForm({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      await clickOnLoginButton();

      await waitFor(async () => {
        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it("match's field error state snapshot", async () => {
      const { asFragment } = render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
        {
          wrapper: RQWrapper,
        }
      );

      const { emailInputElement, passwordInputElement } = await typeIntoForm({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      await userEvent.clear(emailInputElement);
      await userEvent.clear(passwordInputElement);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
