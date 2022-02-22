import { SLCFunctionValidationRule } from './slc-function-validation-rule.enum';

const SLCFunctionValidationMessage = {
  NAME_REQUIRE: 'Function name is required',
  NAME_LENGTH: `Function name must have a minimum of ${SLCFunctionValidationRule.NAME_MIN_LENGTH} characters and a maximum of ${SLCFunctionValidationRule.NAME_MAX_LENGTH} characters.`,
  NAME_FIRST_AND_LAST_CHARTER:
    'Function name must starts and ends with a latin letter or a digit',
  NAME_PATTERN:
    'Function name can contain latin letters, digits, hyphen or underscore',
} as const;

export { SLCFunctionValidationMessage };
