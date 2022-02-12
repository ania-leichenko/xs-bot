import {
  Master as MasterModel,
  Tenant as TenantModel,
  Worker as WorkerModel,
  Group as GroupModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Worker } from './worker/worker.repository';
import { Group } from './group/group.repository';
const master = new Master({
  MasterModel,
});

const tenant = new Tenant({
  TenantModel,
});

const worker = new Worker({
  WorkerModel,
});

const group = new Group({
  GroupModel,
});

export { master, tenant, worker, group };
