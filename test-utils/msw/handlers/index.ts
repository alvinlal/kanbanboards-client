import authHandlers from './auth';
import boardHandlers from './board';
import searchHandlers from './search';

export default [...authHandlers, ...boardHandlers, ...searchHandlers];
