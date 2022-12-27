import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { SignupRequestDto } from '../../api/auth/dto/Request/SignupRequest.dto';
import { signUp as signUpUser, logIn as logInUser, logOut as logOutUser } from '../../api/auth';
import { useUser } from '../useUser/useUser';
import { LoginRequestDto } from '../../api/auth/dto/Request/LoginRequest.dto';
import { useErrorHandlers } from '../useErrorHandlers/useErrorHandlers';

interface UseAuth {
  signUp: (payload: SignupRequestDto) => Promise<void>;
  logIn: (payload: LoginRequestDto) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuth = (): UseAuth => {
  const { updateUser, clearUser } = useUser();
  const navigate = useNavigate();
  const { handleRequestError } = useErrorHandlers();

  const signUp = useCallback(
    async (payload: SignupRequestDto) => {
      const { data } = await signUpUser(payload);
      updateUser(data);
    },
    [updateUser]
  );

  const logIn = useCallback(
    async (payload: LoginRequestDto) => {
      const { data } = await logInUser(payload);
      updateUser(data);
    },
    [updateUser]
  );

  const logOut = useCallback(async () => {
    try {
      await logOutUser();
      navigate('/');
      clearUser();
    } catch (err) {
      handleRequestError(err as AxiosError);
    }
  }, [handleRequestError, navigate, clearUser]);

  return { signUp, logIn, logOut };
};
