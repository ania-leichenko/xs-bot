import { EAMGroupGetByTenantItem } from './eam-group-get-by-tenant-item.type';

type EAMGroupGetByTenantResponseItemDto = {
  id: string;
  name: string;
  createdAt: Date;
  users?: EAMGroupGetByTenantItem[];
  permissions?: EAMGroupGetByTenantItem[];
};

export { type EAMGroupGetByTenantResponseItemDto };
