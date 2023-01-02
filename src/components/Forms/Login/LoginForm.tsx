import { Controller } from 'react-hook-form';
import Button from '../../Button/Button';
import TextField from '../../Inputs/TextField/TextField';
import Spinner from '../../Spinner/Spinner';
import { useLoginForm } from './hooks/useLoginForm';
import styles from './LoginForm.module.scss';
import { ReactComponent as GoogleLogo } from '../../../assets/icons/google.svg';

type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement>;

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { errors, isValid, handleContinueWithGoogle, control, loading, submitForm } =
    useLoginForm();

  return (
    <form className={styles.login__form} onSubmit={submitForm} {...props}>
      <h1>Login</h1>
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, onChange, onBlur } }) => (
          <TextField
            autoFocus
            aria-label="email"
            type="email"
            placeholder="email"
            error={!!errors.email}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <div className={styles.error}>{errors.email && <p>{errors.email.message}</p>}</div>
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, onChange, onBlur } }) => (
          <TextField
            type="password"
            aria-label="password"
            placeholder="password"
            error={!!errors.password}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <div className={styles.error}>{errors.password && <p>{errors.password.message}</p>}</div>
      <Button
        type="submit"
        style={{ width: '100%', height: '56px', borderRadius: 5 }}
        variant="primary"
        disabled={!isValid || loading}
      >
        <p>LOGIN</p>
        {loading && <Spinner />}
      </Button>
      <hr />
      <Button
        type="button"
        onClick={handleContinueWithGoogle}
        style={{ width: '100%', height: '56px', borderRadius: 5 }}
        variant="secondary"
      >
        <p>CONTINUE WITH GOOGLE</p>
        <GoogleLogo width={28} height={28} />
      </Button>
    </form>
  );
};

export default LoginForm;
