import { MasterSignUpValidationRule } from './master-sign-up-validation-rule.enum';

const MasterValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_NOT_VALID: 'The email format is not valid',
  EMAIL_LENGTH: 'You have exceeded the character limit',
  NAME_REQUIRE: 'Name is required',
  NAME_LENGTH: `Name must have a minimum of ${MasterSignUpValidationRule.NAME_MIN_LENGTH} characters and a maximum of
    ${MasterSignUpValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_PATTERN: 'Name can contain latin letters, digits, hyphen or dot',
  NAME_FIRST_AND_LAST_CHARTER:
    'Name must starts and ends with a letter or a digit',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_LENGTH: `Password must have a minimum of ${MasterSignUpValidationRule.PASSWORD_MIN_LENGTH} characters
    and a maximum of ${MasterSignUpValidationRule.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN: 'Spaces are not allowed in a password',
} as const;

export { MasterValidationMessage };
