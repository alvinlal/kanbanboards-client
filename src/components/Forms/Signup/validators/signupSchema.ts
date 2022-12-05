import * as Yup from 'yup';

export const signupSchema = Yup.object({
  email: Yup.string().required('email is required').email('email is not valid'),
  password: Yup.string()
    .required('password is required')
    .test('has-spaces', 'password should not contain spaces', (value) =>
      value ? !(value as string).includes(' ') : true
    )
    .min(6, 'password should contain atleast 6 characters')
    .max(50, 'password should not be more than 50 characters'),
  confirmPassword: Yup.string()
    .required('please confirm password')
    .oneOf([Yup.ref('password'), null], 'passwords must match'),
});
