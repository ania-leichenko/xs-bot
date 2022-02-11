import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMMasterSignUpRequestDto } from '~/common/types/types';
import {
  EAMMasterValidationMessage,
  EAMMasterSignUpValidationRule,
} from '~/common/enums/enums';

const eamMasterSignUp = Joi.object({
  [getNameOf<EAMMasterSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .pattern(EAMMasterSignUpValidationRule.EMAIL_LENGTH)
    .pattern(EAMMasterSignUpValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER, {
      name: 'localPart',
    })
    .pattern(EAMMasterSignUpValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER, {
      name: 'localPart',
    })
    .required()
    .messages({
      'string.email': EAMMasterValidationMessage.EMAIL_WRONG,
      'string.empty': EAMMasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.EMAIL_LENGTH,
      'string.pattern.name':
        EAMMasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMMasterSignUpValidationRule.NAME_MIN_LENGTH)
    .max(EAMMasterSignUpValidationRule.NAME_MAX_LENGTH)
    .pattern(EAMMasterSignUpValidationRule.NAME_PATTERN)
    .pattern(EAMMasterSignUpValidationRule.NAME_FIRST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .pattern(EAMMasterSignUpValidationRule.NAME_LAST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.NAME_REQUIRE,
      'string.min': EAMMasterValidationMessage.NAME_MIN_LENGTH,
      'string.max': EAMMasterValidationMessage.NAME_MAX_LENGTH,
      'string.pattern.base': EAMMasterValidationMessage.NAME_PATTERN,
      'string.pattern.name':
        EAMMasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(EAMMasterSignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMMasterSignUpValidationRule.PASSWORD_MAX_LENGTH)
    .pattern(EAMMasterSignUpValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.PASSWORD_REQUIRE,
      'string.min': EAMMasterValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': EAMMasterValidationMessage.PASSWORD_MAX_LENGTH,
      'string.pattern.base': EAMMasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { eamMasterSignUp };
