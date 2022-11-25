import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import { meController } from './controllers/meController';
import { signupController } from './controllers/signupController';

const authHandlers = [
  rest.get(apiEndPoint('/auth/me'), meController[200]),
  rest.post(apiEndPoint('/auth/signup'), signupController[200]),
];

export default authHandlers;
