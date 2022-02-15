import { EAMGroupRelatedItem } from './eam-group-related-item.type';

type EAMGroupGetByTenantResponseItemDto = {
  id: string;
  name: string;
  createdAt: string;
  users: EAMGroupRelatedItem[];
  permissions: EAMGroupRelatedItem[];
};

export { type EAMGroupGetByTenantResponseItemDto };
