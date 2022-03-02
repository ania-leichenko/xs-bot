import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMWorkerSignInRequestDto } from '~/common/types/types';
import {
  EAMWorkerValidationMessage,
  EAMWorkerValidationRule,
} from '~/common/enums/enums';

const eamWorkerSignIn = Joi.object({
  [getNameOf<EAMWorkerSignInRequestDto>('tenantName')]: Joi.string(),
  [getNameOf<EAMWorkerSignInRequestDto>('workerName')]: Joi.string()
    .trim()
    .ruleset.min(EAMWorkerValidationRule.NAME_MIN_LENGTH)
    .max(EAMWorkerValidationRule.NAME_MAX_LENGTH)
    .rule({ message: EAMWorkerValidationMessage.NAME_LENGTH })
    .regex(EAMWorkerValidationRule.NAME_REGEX)
    .required()
    .messages({
      'string.empty': EAMWorkerValidationMessage.NAME_REQUIRE,
      'string.pattern.base': EAMWorkerValidationMessage.NAME_REGEX,
    }),
  [getNameOf<EAMWorkerSignInRequestDto>('password')]: Joi.string()
    .trim()
    .regex(EAMWorkerValidationRule.PASSWORD_PATTERN)
    .ruleset.min(EAMWorkerValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMWorkerValidationRule.PASSWORD_MAX_LENGTH)
    .rule({ message: EAMWorkerValidationMessage.PASSWORD_LENGTH })
    .required()
    .messages({
      'string.empty': EAMWorkerValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': EAMWorkerValidationMessage.PASSWORD_PATTERN,
    }),
});
export { eamWorkerSignIn };
