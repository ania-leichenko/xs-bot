import { UserPayloadKey } from 'common/enums/enums';
import { UserCreatePayload } from 'common/types/types';

const DEFAULT_REGISTER_PAYLOAD: UserCreatePayload = {
  [UserPayloadKey.EMAIL]: '',
};

export { DEFAULT_REGISTER_PAYLOAD };
