import { MasterDto } from './master-dto.type';

type MasterSignUpResponseDto = {
  user: MasterDto;
  token: string;
};

export { type MasterSignUpResponseDto };
