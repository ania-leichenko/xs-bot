import { reducer as app } from './app/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as groups } from './group-creation/reducer';

const rootReducer = {
  app,
  auth,
  toastr,
  groups,
};

export { rootReducer };
