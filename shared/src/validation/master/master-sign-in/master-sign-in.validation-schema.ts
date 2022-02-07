import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignInDto } from '~/common/types/types';
import { MasterValidationMessage } from '~/common/enums/enums';

const masterSignIn = Joi.object({
  [getNameOf<MasterSignInDto>('email')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.email': MasterValidationMessage.EMAIL_WRONG,
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignInDto>('password')]: Joi.string().trim().required(),
});

export { masterSignIn };
