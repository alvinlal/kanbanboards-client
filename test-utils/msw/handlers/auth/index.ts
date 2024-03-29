import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { loginController } from './controllers/loginController';
import { meController } from './controllers/meController';
import { signupController } from './controllers/signupController';

const authHandlers = [
  rest.get(apiEndPoint('/auth/me'), meController[200]),
  rest.post(apiEndPoint('/auth/signup'), signupController[200]),
  rest.post(apiEndPoint('/auth/login'), loginController[200]),
];

export default authHandlers;
