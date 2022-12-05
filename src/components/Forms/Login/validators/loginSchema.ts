import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().required('please enter your email'),
  password: Yup.string().required('please enter your password'),
});
