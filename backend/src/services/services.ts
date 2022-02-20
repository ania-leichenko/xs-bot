import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import { ENV } from '~/common/enums/app/env.enum';
import {
  master as masterRepository,
  tenant as tenantRepository,
  worker as workerRepository,
  group as groupRepository,
  permission as permissionRepository,
  space as spaceRepository,
  slcFunction as slcFunctionRepository,
} from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from '~/services/group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';
import { Worker } from './worker/worker.service';
import { Auth } from './auth/auth.service';
import { Space } from './space/space.service';
import { S3 } from './aws/s3/s3.service';
import { Permission } from './permission/permission.service';
import { SLCFunction } from './function/function.service';

const token = new Token();
const encrypt = new Encrypt({
  salt: MASTER_PASSWORD_SALT_ROUNDS,
});

const tenant = new Tenant({
  tenantRepository,
});

const master = new Master({
  masterRepository,
  tokenService: token,
  encryptService: encrypt,
  tenantService: tenant,
});

const worker = new Worker({
  workerRepository,
  encryptService: encrypt,
  tokenService: token,
  masterService: master,
  tenantService: tenant,
});

const group = new Group({
  groupRepository,
});

const auth = new Auth({
  masterService: master,
  workerService: worker,
  tokenService: token,
});

const permission = new Permission({
  permissionRepository,
});

const s3 = new S3({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY,
    secretAccessKey: ENV.AWS.SECRET_KEY,
  },
});

const space = new Space({
  spaceRepository,
  tokenService: token,
  s3Service: s3,
});

const slcFunction = new SLCFunction({
  slcFunctionRepository,
  tokenService: token,
});

export {
  master,
  encrypt,
  token,
  tenant,
  worker,
  group,
  auth,
  space,
  s3,
  permission,
  slcFunction,
};
