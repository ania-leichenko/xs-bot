import { User as UserEntity } from '~/services/user/user.entity';
import { User as UserM } from '../../models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const { chat_id, first_name, username, admin, joined, last_action } = user;

    const newUser = await this.#UserModel.query().insert({
      chat_id,
      first_name,
      username,
      admin,
      joined,
      last_action,
    });

    return User.modelToEntity(newUser);
  }

  public async getUserById(chat_id: number): Promise<UserEntity | null> {
    const user = await this.#UserModel.query().where({ chat_id }).first();
    if (!user) return null;
    return User.modelToEntity(user);
  }

  public static modelToEntity(model: UserM): UserEntity {
    const { chat_id, first_name, username, admin, joined, last_action } = model;

    return UserEntity.createNew({
      chat_id,
      first_name,
      username,
      admin,
      joined,
      last_action,
    });
  }
}

export { User };
