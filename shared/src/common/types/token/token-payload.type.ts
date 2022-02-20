import { UserRole } from '~/common/enums/enums';

type TokenPayload = {
  userId: string;
  userRole: UserRole;
  userTenantId: string;
};

export { type TokenPayload };
