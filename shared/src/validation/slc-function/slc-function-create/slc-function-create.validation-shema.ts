import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { SLCFunctionCreateRequestDto } from '~/common/types/types';
import {
  SLCFunctionValidationMessage,
  SLCFunctionValidationRule,
} from '~/common/enums/enums';

const slcFunctionCreate = Joi.object({
  [getNameOf<SLCFunctionCreateRequestDto>('name')]: Joi.string()
    .trim()
    .regex(SLCFunctionValidationRule.NAME_PATTERN)
    .ruleset.regex(SLCFunctionValidationRule.NAME_FIRST_CHARTER)
    .regex(SLCFunctionValidationRule.NAME_LAST_CHARTER)
    .rule({ message: SLCFunctionValidationMessage.NAME_FIRST_AND_LAST_CHARTER })
    .ruleset.min(SLCFunctionValidationRule.NAME_MIN_LENGTH)
    .max(SLCFunctionValidationRule.NAME_MAX_LENGTH)
    .rule({ message: SLCFunctionValidationMessage.NAME_LENGTH })
    .required()
    .messages({
      'string.empty': SLCFunctionValidationMessage.NAME_REQUIRE,
      'string.pattern.base': SLCFunctionValidationMessage.NAME_PATTERN,
    }),
});

export { slcFunctionCreate };
