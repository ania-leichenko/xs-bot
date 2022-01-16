import { TableName, UserDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class User extends Abstract {
  [UserDTOKey.EMAIL]: string;

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
