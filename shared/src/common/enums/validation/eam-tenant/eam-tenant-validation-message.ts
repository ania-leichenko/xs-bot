import { EAMTenantValidationRule } from './eam-tenant-validation-rule.enum';

const EAMTenantValidationMessage = {
  NAME_REQUIRE: 'Tenant name is required',
  NAME_LENGTH: `Tenant name must have a minimum of ${EAMTenantValidationRule.NAME_MIN_LENGTH} characters and a maximum of
  ${EAMTenantValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_PATTERN: 'Tenant name can contain latin letters only',
} as const;

export { EAMTenantValidationMessage };
