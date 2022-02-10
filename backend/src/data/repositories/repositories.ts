import {
  Master as MasterModel,
  Tenant as TenantModel,
  Worker as WorkerModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Worker } from './worker/worker.repository';

const master = new Master({
  MasterModel,
});

const tenant = new Tenant({
  TenantModel,
});

const worker = new Worker({
  WorkerModel,
});

export { master, tenant, worker };
