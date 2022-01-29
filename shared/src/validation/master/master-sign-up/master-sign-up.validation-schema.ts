import * as Joi from 'joi';
import { nameof } from '~/helpers/typescript/typescript';

import { MasterSignUpDto } from '~/dtos/master/master';
import { MasterSignUpValidationMessage } from './master-sign-up.validation-message';

const masterSignUpValidationSchema = Joi.object({
  [nameof<MasterSignUpDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': MasterSignUpValidationMessage.EMAIL_WRONG,
      'string.empty': MasterSignUpValidationMessage.EMAIL_REQUIRE,
    }),
  [nameof<MasterSignUpDto>('name')]: Joi.string().trim().required(),
  [nameof<MasterSignUpDto>('password')]: Joi.string().trim().required(),
});

export { masterSignUpValidationSchema };
