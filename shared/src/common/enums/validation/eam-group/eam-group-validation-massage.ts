import { EAMGroupValidationRule } from './eam-group-validation-rule.enum';

const EAMGroupValidationMessage = {
  NAME_REQUIRE: 'User cannot create a new group without any name',
  NAME_MIN_LENGTH: `Group name must have at least ${EAMGroupValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LENGTH: `Group name must be less than  ${EAMGroupValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_REGEX:
    'Group name must start and end with a letter (symbols "_", "." are not allowed)',
} as const;

export { EAMGroupValidationMessage };
