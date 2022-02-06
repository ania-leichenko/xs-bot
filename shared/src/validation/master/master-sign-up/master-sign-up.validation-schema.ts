import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpDto } from '~/common/types/types';
import { MasterSignUpValidationMessage } from '~/common/enums/enums';
import { MasterSignUpValidationRule } from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': MasterSignUpValidationMessage.EMAIL_WRONG,
      'string.empty': MasterSignUpValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignUpDto>('name')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.NAME_MIN_LENGTH)
    .regex(MasterSignUpValidationRule.NAME_FIRST_CHARTER)
    .required()
    .messages({
      'string.empty': MasterSignUpValidationMessage.NAME_REQUIRE,
      'string.min': MasterSignUpValidationMessage.NAME_MIN_LENGTH,
      'string.pattern.base': MasterSignUpValidationMessage.NAME_FIRST_CHARTER,
    }),
  [getNameOf<MasterSignUpDto>('password')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.PASSWORD_MIN_LENGTH)
    .required()
    .messages({
      'string.empty': MasterSignUpValidationMessage.PASSWORD_REQUIRE,
      'string.min': MasterSignUpValidationMessage.PASSWORD_MIN_LENGTH,
    }),
});

export { masterSignUp };
