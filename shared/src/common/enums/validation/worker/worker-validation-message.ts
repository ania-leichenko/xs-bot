import { EAMWorkerValidationRule } from './create-worker-validation-rule.enum';
const EAMWorkerValidationMessage = {
  NAME_REQUIRE: 'User cannot create a new user without any name',
  NAME_MIN_LENGTH: `Name must have at least ${EAMWorkerValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LENGTH: `Name must be less than  ${EAMWorkerValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_REGEX:
    'Name must start and end with a letter (allowed symbols "_", ".")',
} as const;

export { EAMWorkerValidationMessage };
