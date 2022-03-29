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
import { reducer as slc } from './slc/reducer';
import { reducer as SLCFunctionConfigurate } from './slc-configurate-function/reducer';
import { reducer as BSSpace } from './bs-space/reducer';

const rootReducer = {
  app,
  auth,
  eam,
  sc,
  SCConfigurateInstance,
  bs,
  BSSpace,
  BSSpaceCreate,
  slc,
  SLCFunctionConfigurate,
  toastr,
  EAMGroupConfigurate,
  EAMWorkerConfigurate,
};

export { rootReducer };
