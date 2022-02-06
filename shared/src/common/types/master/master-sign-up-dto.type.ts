import { MasterDto } from './master-dto.type';

type MasterSignUpDto = MasterDto & { token: string };

export { type MasterSignUpDto };
