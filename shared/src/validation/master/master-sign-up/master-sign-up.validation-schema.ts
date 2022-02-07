import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpDto } from '~/common/types/types';
import {
  MasterValidationMessage,
  MasterSignUpValidationRule,
} from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': MasterValidationMessage.EMAIL_WRONG,
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignUpDto>('name')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.NAME_MIN_LENGTH)
    .regex(MasterSignUpValidationRule.NAME_FIRST_CHARTER)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.NAME_REQUIRE,
      'string.min': MasterValidationMessage.NAME_MIN_LENGTH,
      'string.pattern.base': MasterValidationMessage.NAME_FIRST_CHARTER,
    }),
  [getNameOf<MasterSignUpDto>('password')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.PASSWORD_MIN_LENGTH)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.PASSWORD_REQUIRE,
      'string.min': MasterValidationMessage.PASSWORD_MIN_LENGTH,
    }),
});

export { masterSignUp };
