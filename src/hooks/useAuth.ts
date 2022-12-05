import { useCallback } from 'react';
import { SignupPayload } from '../api/auth/types/SignupPayload';
import { signUp as signUpUser, logIn as logInUser } from '../api/auth';
import { useUser } from './useUser/useUser';
import { LoginPayload } from '../api/auth/types/LoginPayload';

interface UseAuth {
  signUp: (payload: SignupPayload) => Promise<void>;
  logIn: (payload: LoginPayload) => Promise<void>;
}

export const useAuth = (): UseAuth => {
  const { updateUser } = useUser();

  const signUp = useCallback(
    async (payload: SignupPayload) => {
      const { data } = await signUpUser(payload);
      updateUser(data);
    },
    [updateUser]
  );

  const logIn = useCallback(
    async (payload: LoginPayload) => {
      const { data } = await logInUser(payload);
      updateUser(data);
    },
    [updateUser]
  );

  return { signUp, logIn };
};
