import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignInDto } from '~/common/types/types';
import { MasterSignInValidationMessage } from '~/common/enums/enums';

const masterSignIn = Joi.object({
  [getNameOf<MasterSignInDto>('name')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.name': MasterSignInValidationMessage.NAME_WRONG,
      'string.empty': MasterSignInValidationMessage.NAME_REQUIRE,
    }),
  [getNameOf<MasterSignInDto>('password')]: Joi.string().trim().required(),
});

export { masterSignIn };
