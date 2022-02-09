import {
  Master as MasterModel,
  Tenant as TenantModel,
} from '~/data/models/models';
import { MasterRepository } from './master/master.repository';
import { TenantRepository } from './tenant/tenant.repository';

const masterRepository = new MasterRepository({
  MasterModel,
});

const tenantRepository = new TenantRepository({
  TenantModel,
});

export { masterRepository, tenantRepository };
