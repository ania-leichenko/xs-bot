import { UserRole } from '~/common/enums/enums';

type TokenPayload = {
  userId: string;
  userRole: UserRole;
};

export { type TokenPayload };
