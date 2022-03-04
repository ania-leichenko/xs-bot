import { EAMTenantFormDto, EAMTenantByIdResponseDto } from 'common/types/types';

const mapTenantDefaultValues = (
  tenant: EAMTenantByIdResponseDto | null,
): EAMTenantFormDto => ({
  name: tenant?.name ?? '',
});

export { mapTenantDefaultValues };
