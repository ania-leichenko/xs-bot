import { MasterDto } from './master-dto.type';

type MasterSignUpResponseDto = MasterDto & { token: string };

export { type MasterSignUpResponseDto };
