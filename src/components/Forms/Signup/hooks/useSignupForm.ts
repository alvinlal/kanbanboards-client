import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldErrorsImpl,
  Control,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useErrorHandlers from '../../../../hooks/useErrorHandlers';
import signupSchema from '../validators/signupSchema';

interface UseSignupForm {
  loading: boolean;
  isValid: boolean;
  errors: Partial<FieldErrorsImpl<FormInputs>>;
  control: Control<FormInputs, unknown>;
  handleGoogleSignUp: () => void;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  onSubmit: SubmitHandler<FormInputs>;
  trigger: UseFormTrigger<FormInputs>;
}

type FormInputs = {
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
  } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { handleRequestError } = useErrorHandlers();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
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

  return {
    control,
    errors,
    handleSubmit,
    handleGoogleSignUp,
    isValid,
    loading,
    onSubmit,
    trigger,
  };
};
