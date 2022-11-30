import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldErrorsImpl, Control, UseFormTrigger } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useErrorHandlers from '../../../../hooks/useErrorHandlers';
import signupSchema from '../validators/signupSchema';

interface UseSignupForm {
  loading: boolean;
  isValid: boolean;
  errors: Partial<FieldErrorsImpl<SignupFormInputs>>;
  control: Control<SignupFormInputs, unknown>;
  handleGoogleSignUp: () => void;
  submitForm: (e: React.FormEvent) => void;
  trigger: UseFormTrigger<SignupFormInputs>;
}

export type SignupFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignupForm = (): UseSignupForm => {
  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { handleRequestError } = useErrorHandlers();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormInputs> = useCallback(
    async ({ email, password }) => {
      try {
        setLoading(true);
        await signUp({ email, password });
        navigate('/');
      } catch (err) {
        const requestErrors = handleRequestError(err as AxiosError);
        if (requestErrors) {
          setError(
            'email',
            {
              message: requestErrors.message[0].constraints.isEmailExists,
            },
            {
              shouldFocus: true,
            }
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [signUp, navigate, handleRequestError, setError]
  );

  const handleGoogleSignUp = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return {
    control,
    errors,
    handleGoogleSignUp,
    isValid,
    loading,
    submitForm,
    trigger,
  };
};
