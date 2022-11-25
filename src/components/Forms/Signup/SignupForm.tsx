import { Controller } from 'react-hook-form';

import Button from '../../Button/Button';
import TextField from '../../Inputs/TextField/TextField';
import styles from './SignupForm.module.scss';
import { ReactComponent as GoogleLogo } from '../../../assets/icons/google.svg';

import Spinner from '../../Spinner/Spinner';
import { useSignupForm } from './hooks/useSignupForm';

type SignupFormProps = React.FormHTMLAttributes<HTMLFormElement>;

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const {
    errors,
    isValid,
    control,
    handleGoogleSignUp,
    handleSubmit,
    onSubmit,
    loading,
    trigger,
  } = useSignupForm();

  return (
    <form
      className={styles.signup__form}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
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
        type="button"
        onClick={handleGoogleSignUp}
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
