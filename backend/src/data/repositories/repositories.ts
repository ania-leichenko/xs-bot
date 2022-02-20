import {
  Master as MasterModel,
  Tenant as TenantModel,
  Worker as WorkerModel,
  Group as GroupModel,
  UsersGroups as UsersGroupsModel,
  Space as SpaceModel,
  Permission as PermissionModel,
  GroupsPermissions as GroupsPermissionsModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Worker } from './worker/worker.repository';
import { Group } from './group/group.repository';
import { Space } from './space/space.repository';
import { Permission } from './permission/permission.repository';

const master = new Master({
  MasterModel,
  PermissionModel,
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
  GroupsPermissionsModel,
});

const permission = new Permission({
  PermissionModel,
});

const space = new Space({
  SpaceModel,
});

export { master, group, tenant, worker, space, permission };
