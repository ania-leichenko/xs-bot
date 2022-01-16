import { User as TUser, UserCreatePayload } from '~/common/types/types';
import { UserModel as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  getAll(): Promise<TUser[]> {
    return this.#UserModel.query().then();
  }

  create(payload: UserCreatePayload): Promise<TUser> {
    return this.#UserModel.query().insert(payload).then();
  }
}

export { User };
