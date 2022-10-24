import { setupWorker } from 'msw';
import handlers from '../test-utils/msw/handlers';

const worker = setupWorker(...handlers);

export default worker;
