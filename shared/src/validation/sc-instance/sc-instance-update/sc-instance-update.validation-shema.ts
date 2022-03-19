import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { SCInstanceUpdateRequestDto } from '~/common/types/types';
import {
  SCInstanceValidationRule,
  SCInstanceValidationMessage,
} from '~/common/enums/enums';

const scInstanceUpdate = Joi.object({
  [getNameOf<SCInstanceUpdateRequestDto>('name')]: Joi.string()
    .trim()
    .min(SCInstanceValidationRule.NAME_MIN_LENGTH)
    .max(SCInstanceValidationRule.NAME_MAX_LENGTH)
    .regex(SCInstanceValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': SCInstanceValidationMessage.NAME_REQUIRE,
      'string.min': SCInstanceValidationMessage.NAME_LENGTH,
      'string.max': SCInstanceValidationMessage.NAME_LENGTH,
      'string.pattern.base': SCInstanceValidationMessage.NAME_PATTERN,
    }),
});

export { scInstanceUpdate };
