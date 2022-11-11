import { useCallback } from 'react';
import { SignupPayload } from '../api/auth/types/SignupPayload';
import { signUp as signUpUser } from '../api/auth';
import useUser from './useUser';

interface UseAuth {
  signUp: (payload: SignupPayload) => Promise<void>;
}

const useAuth = (): UseAuth => {
  const { updateUser } = useUser();

  const signUp = useCallback(
    async (payload: SignupPayload) => {
      const { data } = await signUpUser(payload);
      updateUser(data);
    },
    [updateUser]
  );

  return { signUp };
};

export default useAuth;
