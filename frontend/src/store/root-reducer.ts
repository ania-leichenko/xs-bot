import { reducer as app } from './app/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as EAMWorkerConfigurate } from './eam-worker-configurate/eam-worker-configurate';

const rootReducer = {
  app,
  auth,
  toastr,
  EAMWorkerConfigurate,
};

export { rootReducer };
