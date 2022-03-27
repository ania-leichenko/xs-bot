import { EAMGroupGetByTenantResponseItemDto } from './eam-group-get-by-tenant-response-item-dto.type';

type EAMGroupGetByTenantResponseDto = {
  items: EAMGroupGetByTenantResponseItemDto[];
  countItems: number;
};

export { type EAMGroupGetByTenantResponseDto };
