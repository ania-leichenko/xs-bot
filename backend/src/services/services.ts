import {
  masterRepository,
  tenantRepository,
} from '~/data/repositories/repositories';
import { MasterService } from './master/master.service';
import { EncryptService } from './encrypt/encrypt.service';
import { TokenService } from './token/token.service';
import { TenantService } from './tenant/tenant.service';

const tokenService = new TokenService();
const encryptService = new EncryptService();

const tenantService = new TenantService({
  tenantRepository,
});

const masterService = new MasterService({
  masterRepository,
  tokenService,
  encryptService,
  tenantService,
});

export { masterService, encryptService, tokenService, tenantService };
