import { UserRole } from '~/common/enums/enums';

type TokenPayload = {
  userId: string;
  userRole: UserRole;
  tenantId: string;
};

export { type TokenPayload };
