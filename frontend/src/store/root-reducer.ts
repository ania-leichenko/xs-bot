import { reducer as app } from './app/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as eam } from './eam/reducer';
import { reducer as bs } from './bs/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as EAMGroupConfigurate } from './eam-group-configurate/reducer';
import { reducer as EAMWorkerConfigurate } from './eam-worker-configurate/reducer';
import { reducer as BSSpaceCreate } from './bs-space-create/reducer';
import { reducer as SCConfigurateInstance } from './sc-configurate-instance/reducer';
import { reducer as sc } from './sc/reducer';
import { reducer as SLCFunctionConfigurate } from './slc-configurate-function/reducer';

const rootReducer = {
  app,
  auth,
  eam,
  sc,
  SCConfigurateInstance,
  bs,
  BSSpaceCreate,
  SLCFunctionConfigurate,
  toastr,
  EAMGroupConfigurate,
  EAMWorkerConfigurate,
};

export { rootReducer };
