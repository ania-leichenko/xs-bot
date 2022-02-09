import { reducer as auth } from './auth/reducer';
import { reducer as toastr } from 'react-redux-toastr';

const rootReducer = {
  auth,
  toastr,
};

export { rootReducer };
