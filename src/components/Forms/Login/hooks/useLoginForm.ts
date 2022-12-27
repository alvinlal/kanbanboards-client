import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { useForm, SubmitHandler, Control, FieldErrorsImpl } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth/useAuth';
import { useErrorHandlers } from '../../../../hooks/useErrorHandlers/useErrorHandlers';
import { UnauthorizedException } from '../../../../types/UnauthorizedException';

import { loginSchema } from '../validators/loginSchema';

interface UseLoginForm {
  loading: boolean;
  isValid: boolean;
  errors: Partial<FieldErrorsImpl<LoginFormInputs>>;
  control: Control<LoginFormInputs, unknown>;
  handleContinueWithGoogle: () => void;
  submitForm: (e: React.FormEvent) => void;
}

export type LoginFormInputs = {
  email: string;
  password: string;
};

export const useLoginForm = (): UseLoginForm => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const { handleRequestError } = useErrorHandlers();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = useCallback(
    async ({ email, password }) => {
      try {
        setLoading(true);
        await logIn({ email, password });
        navigate('/');
      } catch (err) {
        const requestErrors = handleRequestError(err as AxiosError) as UnauthorizedException;

        if (requestErrors) {
          setError('password', {
            message: requestErrors.message,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [logIn, navigate, handleRequestError, setError]
  );

  const handleContinueWithGoogle = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return {
    control,
    errors,
    isValid,
    loading,
    submitForm,
    handleContinueWithGoogle,
  };
};
