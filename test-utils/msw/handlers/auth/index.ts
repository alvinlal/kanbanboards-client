import { rest } from 'msw';
import { apiEndPoint } from '../../baseUrls';
import me from './controllers/me';
import signUp from './controllers/signUp';

const authHandlers = [
  rest.get(apiEndPoint('/auth/me'), me[200]),
  rest.post(apiEndPoint('/auth/signup'), signUp[200]),
];

export default authHandlers;
