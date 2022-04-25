import { User as UserM } from '~/data/models/models';
import { User as UserEntity } from '~/services/user/user.entity';

type Constructor = {
  UserModel: typeof UserM;
};

class UserRepository {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.#UserModel.query();
    return users.map((user) => UserRepository.modelToEntity(user));
  }

  public static modelToEntity(model: UserM): UserEntity {
    return UserEntity.initialize(model);
  }
}

export { UserRepository };
