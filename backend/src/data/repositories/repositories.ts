import {
  Master as MasterModel,
  Tenant as TenantModel,
  Worker as WorkerModel,
  Group as GroupModel,
  UsersGroups as UsersGroupsModel,
  Instance as InstanceModel,
  KeyPair as KeyPairModel,
  OperationSystem as OperationSystemModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Worker } from './worker/worker.repository';
import { Group } from './group/group.repository';
import { Instance } from './instance/instance.repository';
import { KeyPair } from './key-pair/key-pair.repository';
import { OperationSystem } from './operation-system/operation-system.repository';

const master = new Master({
  MasterModel,
});

const tenant = new Tenant({
  TenantModel,
});

const worker = new Worker({
  WorkerModel,
  UsersGroupsModel,
});

const group = new Group({
  GroupModel,
  UsersGroupsModel,
});

const instance = new Instance({
  InstanceModel,
});

const keyPair = new KeyPair({
  KeyPairModel,
});

const operationSystem = new OperationSystem({
  OperationSystemModel,
});

export { master, group, tenant, worker, instance, keyPair, operationSystem };
