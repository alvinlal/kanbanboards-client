import { useCallback, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Button from '../../Button/Button';
import TextField from '../../Inputs/TextField/TextField';
import styles from './SignupForm.module.scss';
import { ReactComponent as GoogleLogo } from '../../../assets/icons/google.svg';
import signupSchema from './validators/signupSchema';
import useAuth from '../../../hooks/useAuth';
import useErrorHandlers from '../../../hooks/useErrorHandlers';
import Spinner from '../../Spinner/Spinner';

type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm: React.FC = () => {
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
              message: requestErrors.message[0].constraints.IsEmailExists,
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

  const handleGoogleSignIn = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
  }, []);

  return (
    <form className={styles.signup__form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Signup</h1>
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, onChange, onBlur } }) => (
          <TextField
            type="text"
            placeholder="email"
            error={!!errors.email}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <div className={styles.error}>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, onChange, onBlur } }) => (
          <TextField
            type="password"
            placeholder="password"
            error={!!errors.password}
            onChange={async (e) => {
              onChange(e);
              await trigger('confirmPassword');
            }}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <div className={styles.error}>
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { ref, onChange, onBlur } }) => (
          <TextField
            type="password"
            placeholder="confirm password"
            error={!!errors.confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <div className={styles.error}>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <Button
        type="submit"
        width="100%"
        height="56px"
        variant="primary"
        disabled={!isValid || loading}
      >
        <p>SIGNUP</p>
        {loading && <Spinner />}
      </Button>
      <hr />
      <Button
        onClick={handleGoogleSignIn}
        width="100%"
        height="56px"
        variant="secondary"
      >
        <p>CONTINUE WITH GOOGLE</p>
        <GoogleLogo width={28} height={28} />
      </Button>
    </form>
  );
};

export default SignupForm;
