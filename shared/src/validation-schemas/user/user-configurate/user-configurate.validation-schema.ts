import * as Joi from 'joi';
import { UserValidationMessage, UserPayloadKey } from '~/common/enums/enums';

const userConfigurate = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { userConfigurate };
