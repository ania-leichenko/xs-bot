import { MasterDto } from './master-dto.type';

type MasterSignUpResponseDto = {
  user: MasterDto;
  token: string;
  tenantId: string;
};

export { type MasterSignUpResponseDto };
