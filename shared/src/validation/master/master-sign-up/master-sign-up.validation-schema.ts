import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpRequestDto } from '~/common/types/types';
import { MasterSignUpValidationMessage } from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': MasterSignUpValidationMessage.EMAIL_WRONG,
      'string.empty': MasterSignUpValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignUpRequestDto>('name')]: Joi.string().trim().required(),
  [getNameOf<MasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .required(),
});

export { masterSignUp };
