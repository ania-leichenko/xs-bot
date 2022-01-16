import { UserPayloadKey } from '~/common/enums/enums';

type UserCreatePayload = {
  [UserPayloadKey.EMAIL]: string;
};

export { type UserCreatePayload };
