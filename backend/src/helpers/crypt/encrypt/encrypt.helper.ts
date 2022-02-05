import { hash } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS as salt } from '~/common/constants/master.constants';

const encrypt = (data: string): Promise<string> => hash(data, salt);

export { encrypt };
