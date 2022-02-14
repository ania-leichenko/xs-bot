import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMMasterSignInRequestDto } from '~/common/types/types';
import {
  EAMMasterValidationMessage,
  EAMMasterValidationRule,
} from '~/common/enums/enums';

const eamMasterSignIn = Joi.object({
  [getNameOf<EAMMasterSignInRequestDto>('email')]: Joi.string()
    .trim()
    .ruleset.email({ tlds: { allow: false } })
    .regex(EAMMasterValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER)
    .regex(EAMMasterValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER)
    .regex(EAMMasterValidationRule.EMAIL_PATTERN)
    .rule({ message: EAMMasterValidationMessage.EMAIL_NOT_VALID })
    .regex(EAMMasterValidationRule.EMAIL_LENGTH)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.EMAIL_LENGTH,
    }),
  [getNameOf<EAMMasterSignInRequestDto>('password')]: Joi.string()
    .trim()
    .regex(EAMMasterValidationRule.PASSWORD_PATTERN)
    .ruleset.min(EAMMasterValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMMasterValidationRule.PASSWORD_MAX_LENGTH)
    .rule({ message: EAMMasterValidationMessage.PASSWORD_LENGTH })
    .ruleset.regex(EAMMasterValidationRule.PASSWORD_SPACE)
    .rule({ message: EAMMasterValidationMessage.PASSWORD_SPACE })
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { eamMasterSignIn };
