import { EAMGroupGetByTenantItemResponseDto } from './eam-group-get-by-tenant-item-response-dto.type';

type EAMGroupGetByTenantResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  users: EAMGroupGetByTenantItemResponseDto[];
  permissions: EAMGroupGetByTenantItemResponseDto[];
};

export { type EAMGroupGetByTenantResponseDto };
