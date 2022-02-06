import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpDto } from '~/common/types/types';
import { MasterValidationMessage } from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': MasterValidationMessage.EMAIL_WRONG,
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignUpDto>('email')]: Joi.string().trim().required(),
  [getNameOf<MasterSignUpDto>('password')]: Joi.string().trim().required(),
});

export { masterSignUp };
