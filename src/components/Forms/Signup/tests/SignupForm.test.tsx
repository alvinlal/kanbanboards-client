/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Requirements :-
 * Should show error on invalid email
 * Should show error on invalid password
 * Should show error if passwords don't match
 * Should re-check if passwords match on changing password field after filling confirm password field
 * Should show error if email already exists on clicking signup
 * Signup button should be disabled if there are errors
 * Should show loading spinner on clicking signup
 * Should not show any errors if all fields are valid
 * Should navigate user to home page after successfull signup
 * Should match snapshot
 * Should match loading snapshot
 * Should match error snapshot
 */
import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';
import { apiEndPoint } from '../../../../../test-utils/msw/baseUrls';
import { signupController } from '../../../../../test-utils/msw/handlers/auth/controllers/signupController';
import { rest, server } from '../../../../../test-utils/msw/server';
import { RQWrapper } from '../../../../react-query/RQWrapper';
import { SignupFormInputs } from '../hooks/useSignupForm';
import SignupForm from '../SignupForm';
import defaultHandlers from '../../../../../test-utils/msw/defaultHandlers';

describe('SignupForm.tsx', () => {
  const typeIntoForm = async ({ email, password, confirmPassword }: Partial<SignupFormInputs>) => {
    const user = userEvent.setup();
    const emailInputElement = screen.getByLabelText('email') as HTMLInputElement;
    const passwordInputElement = screen.getByLabelText('password') as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      'confirm password'
    ) as HTMLInputElement;

    if (email) {
      await user.type(emailInputElement, email);
    }
    if (password) {
      await user.type(passwordInputElement, password);
    }
    if (confirmPassword) {
      await user.type(confirmPasswordInputElement, confirmPassword);
    }

    const emailInvalidErrorElement = screen.queryByText(/email is not valid/i);
    const passwordLengthErrorElement = screen.queryByText(
      /password should contain atleast 6 characters/i
    );
    const passwordSpaceErrorElement = screen.queryByText(/password should not contain spaces/i);
    const confirmPasswordDontMatchErrorElement = screen.queryByText(/passwords must match/i);

    return {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      emailInvalidErrorElement,
      passwordLengthErrorElement,
      passwordSpaceErrorElement,
      confirmPasswordDontMatchErrorElement,
    };
  };

  const clickOnSignupButton = async () => {
    const signupButtonElement = screen.getByRole('button', {
      name: /SIGNUP/i,
    }) as HTMLButtonElement;
    await userEvent.click(signupButtonElement);
    return signupButtonElement;
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
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { emailInputElement } = await typeIntoForm({ email: faker.internet.email() });
        await userEvent.clear(emailInputElement);
        const emailIsRequiredErrorElement = await screen.findByText(/email is required/i);
        expect(emailIsRequiredErrorElement).toBeInTheDocument();
      });
    });

    describe('when email is invalid', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { emailInvalidErrorElement } = await typeIntoForm({ email: 'invalidemail.com' });
        expect(emailInvalidErrorElement).toBeInTheDocument();
      });
    });

    describe('when email already exists', () => {
      it('shows correct error message', async () => {
        server.use(rest.post(apiEndPoint('/auth/signup'), signupController[400]));

        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(6);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
        await clickOnSignupButton();
        const emailExistsErrorElement = await screen.findByText(
          /Account already exists, please login/i
        );
        expect(emailExistsErrorElement).toBeInTheDocument();
      });
    });
  });

  describe('Should show password errors', () => {
    describe('when password is empty', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { passwordInputElement } = await typeIntoForm({
          password: faker.internet.password(),
        });
        await userEvent.clear(passwordInputElement);
        const passwordIsRequiredErrorElement = await screen.findByText(/password is required/i);
        expect(passwordIsRequiredErrorElement).toBeInTheDocument();
      });
    });
    describe('when password is less than 6 characters', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { passwordLengthErrorElement } = await typeIntoForm({
          password: faker.internet.password(3),
        });
        expect(passwordLengthErrorElement).toBeInTheDocument();
      });
    });

    describe('when password contain space', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { passwordSpaceErrorElement } = await typeIntoForm({
          password: `${faker.internet.password(3)} `,
        });
        expect(passwordSpaceErrorElement).toBeInTheDocument();
      });
    });
  });

  describe('Should show confirm password errors', () => {
    describe('when confirm password is empty', () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const { confirmPasswordInputElement } = await typeIntoForm({
          confirmPassword: faker.internet.password(),
        });
        await userEvent.clear(confirmPasswordInputElement);
        const confirmPasswordIsRequiredErrorElement = await screen.findByText(
          /please confirm password/i
        );
        expect(confirmPasswordIsRequiredErrorElement).toBeInTheDocument();
      });
    });

    describe("when passwords don't match", () => {
      it('shows correct error message', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(6);
        const { confirmPasswordDontMatchErrorElement } = await typeIntoForm({
          password,
          confirmPassword: `${password}123`,
        });
        expect(confirmPasswordDontMatchErrorElement).toBeInTheDocument();
      });
    });
  });

  describe('Should navigate user to the correct destination after successfull signup', () => {
    describe('when signup button is clicked with correct form inputs', () => {
      it('should navigate user to home page', async () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        render(
          <Router location={history.location} navigator={history}>
            <SignupForm />
          </Router>,
          { wrapper: RQWrapper }
        );

        const password = faker.internet.password(6);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });

        await clickOnSignupButton();

        expect(history.push).toHaveBeenCalledWith(
          { pathname: '/', search: '', hash: '' },
          undefined,
          {}
        );
      });

      it('should show loading spinner in signup button', async () => {
        server.use(rest.post(apiEndPoint('/auth/signup'), defaultHandlers.LOADING));
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(6);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
        await clickOnSignupButton();
        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
      });

      it('signup button should be disabled while signup api request is loading', async () => {
        server.use(rest.post(apiEndPoint('/auth/signup'), defaultHandlers.LOADING));
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(6);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
        const signupButtonElement = await clickOnSignupButton();
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
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );

        await clickOnGoogleButton();
        expect(window.location.href).toBe(`${import.meta.env.VITE_API_ENDPOINT}/auth/google`);
      });
    });
  });

  describe('Should show correct button states for signup button', () => {
    describe('when there is no errors', () => {
      it('signup button should not be disabled', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(6);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
        const signupButtonElement = await clickOnSignupButton();
        await waitFor(() => {
          expect(signupButtonElement.disabled).toBe(false);
        });
      });
    });

    describe('when there are errors', () => {
      it('signup button should be disabled', async () => {
        render(
          <MemoryRouter>
            <SignupForm />
          </MemoryRouter>,
          { wrapper: RQWrapper }
        );
        const password = faker.internet.password(2);
        await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
        const signupButtonElement = await clickOnSignupButton();
        await waitFor(() => {
          expect(signupButtonElement.disabled).toBe(true);
        });
      });
    });
  });

  describe('Should match snapshots', () => {
    it("match's default snapshot", () => {
      const tree = renderer.create(
        <MemoryRouter>
          <RQWrapper>
            <SignupForm />
          </RQWrapper>
        </MemoryRouter>
      );
      expect(tree).toMatchSnapshot();
    });
    it("match's loading state snapshot", async () => {
      server.use(rest.post(apiEndPoint('/auth/signup'), defaultHandlers.LOADING));

      const { asFragment } = render(
        <MemoryRouter>
          <SignupForm />
        </MemoryRouter>,
        {
          wrapper: RQWrapper,
        }
      );

      const password = faker.internet.password(6);
      await typeIntoForm({ email: faker.internet.email(), password, confirmPassword: password });
      await clickOnSignupButton();

      await waitFor(async () => {
        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
      });

      expect(asFragment()).toMatchSnapshot();
    });

    it("match's field error state snapshot", async () => {
      const { asFragment } = render(
        <MemoryRouter>
          <SignupForm />
        </MemoryRouter>,
        {
          wrapper: RQWrapper,
        }
      );
      const password = faker.internet.password(2);
      await typeIntoForm({
        email: 'invalidemail.com',
        password,
        confirmPassword: `${password}123`,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
