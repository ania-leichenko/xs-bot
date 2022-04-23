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
    const { chatId, firstName, username, admin, joined, lastAction } = user;

    const newUser = await this.#UserModel.query().insert({
      chatId,
      firstName,
      username,
      admin,
      joined,
      lastAction,
    });

    return User.modelToEntity(newUser);
  }

  public async getUserById(chatId: number): Promise<UserEntity | null> {
    const user = await this.#UserModel.query().where({ chatId }).first();
    if (!user) return null;
    return User.modelToEntity(user);
  }

  public static modelToEntity(model: UserM): UserEntity {
    const { chatId, firstName, username, admin, joined, lastAction } = model;

    return UserEntity.createNew({
      chatId,
      firstName,
      username,
      admin,
      joined,
      lastAction,
    });
  }
}

export { User };
