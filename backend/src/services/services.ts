import { EC2Client } from '@aws-sdk/client-ec2';
import { ENV } from '~/common/enums/enums';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import {
  master as masterRepository,
  tenant as tenantRepository,
  worker as workerRepository,
  group as groupRepository,
  keyPair as keyPairRepository,
  instance as instanceRepository,
  operationSystem as operationSystemRepository,
} from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from './group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';
import { Worker } from './worker/worker.service';
import { Auth } from './auth/auth.service';
import { AWSEc2 } from './aws-ec2/aws-ec2.service';
import { KeyPair } from './key-pair/key-pair.service';
import { Instance } from './instance/instance.service';

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

const ec2Client = new EC2Client({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY as string,
    secretAccessKey: ENV.AWS.SECRET_KEY as string,
  },
});

const awsEc2 = new AWSEc2({
  ec2ClientService: ec2Client,
});

const keyPair = new KeyPair({
  keyPairRepository,
  awsEc2Service: awsEc2,
});

const instance = new Instance({
  instanceRepository,
  operationSystemRepository,
  keyPairService: keyPair,
  awsEc2Service: awsEc2,
});

export {
  master,
  encrypt,
  token,
  tenant,
  worker,
  group,
  auth,
  ec2Client,
  awsEc2,
  keyPair,
  instance,
};
