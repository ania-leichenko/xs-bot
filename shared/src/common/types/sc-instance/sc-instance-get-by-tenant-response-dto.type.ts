import { SCInstanceGetByTenantResponseItemDto } from './sc-instance-get-by-tenant-response-item-dto.type';

type SCInstanceGetByTenantResponseDto = {
  items: SCInstanceGetByTenantResponseItemDto[];
  countItems: number;
};

export { type SCInstanceGetByTenantResponseDto };
