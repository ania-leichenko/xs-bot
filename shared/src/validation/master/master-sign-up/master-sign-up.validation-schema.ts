import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpRequestDto } from '~/common/types/types';
import {
  MasterValidationMessage,
  MasterSignUpValidationRule,
} from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .ruleset.email({ tlds: { allow: false } })
    .regex(MasterSignUpValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER)
    .regex(MasterSignUpValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER)
    .rule({ message: MasterValidationMessage.EMAIL_NOT_VALID })
    .regex(MasterSignUpValidationRule.EMAIL_LENGTH)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': MasterValidationMessage.EMAIL_LENGTH,
    }),
  [getNameOf<MasterSignUpRequestDto>('name')]: Joi.string()
    .trim()
    .ruleset.min(MasterSignUpValidationRule.NAME_MIN_LENGTH)
    .max(MasterSignUpValidationRule.NAME_MAX_LENGTH)
    .rule({ message: MasterValidationMessage.NAME_LENGTH })
    .ruleset.regex(MasterSignUpValidationRule.NAME_FIRST_CHARTER)
    .regex(MasterSignUpValidationRule.NAME_LAST_CHARTER)
    .rule({ message: MasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER })
    .regex(MasterSignUpValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.NAME_REQUIRE,
      'string.pattern.base': MasterValidationMessage.NAME_PATTERN,
    }),
  [getNameOf<MasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .ruleset.min(MasterSignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(MasterSignUpValidationRule.PASSWORD_MAX_LENGTH)
    .rule({ message: MasterValidationMessage.PASSWORD_LENGTH })
    .regex(MasterSignUpValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': MasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { masterSignUp };
