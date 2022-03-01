import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMTenantUpdateRequestDto } from '~/common/types/types';
import {
  EAMTenantValidationMessage,
  EAMTenantValidationRule,
} from '~/common/enums/enums';

const eamTenantUpdate = Joi.object({
  [getNameOf<EAMTenantUpdateRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMTenantValidationRule.NAME_MIN_LENGTH)
    .max(EAMTenantValidationRule.NAME_MAX_LENGTH)
    .regex(EAMTenantValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': EAMTenantValidationMessage.NAME_REQUIRE,
      'string.min': EAMTenantValidationMessage.NAME_LENGTH,
      'string.pattern.base': EAMTenantValidationMessage.NAME_PATTERN,
    }),
});

export { eamTenantUpdate };
