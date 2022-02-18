import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import {
  master as masterRepository,
  tenant as tenantRepository,
  worker as workerRepository,
  group as groupRepository,
  space as spaceRepository,
} from '~/data/repositories/repositories';
import { s3 as s3Client } from '~/services/aws/s3/s3.client';
import { Master } from './master/master.service';
import { Group } from '~/services/group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';
import { Worker } from './worker/worker.service';
import { Auth } from './auth/auth.service';
import { Space } from './space/space.service';
import { S3 } from './aws/s3/s3.service';

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

const s3 = new S3({
  s3Client,
});

const space = new Space({
  spaceRepository,
  tokenService: token,
  s3Service: s3,
});

export { master, encrypt, token, tenant, worker, group, auth, space, s3 };
