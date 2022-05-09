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
    const users = await this.#UserModel.query().orderBy('joined', 'asc');
    return users.map((user) => UserRepository.modelToEntity(user));
  }

  public async delete(usersId: number): Promise<number> {
    return this.#UserModel.query().deleteById(usersId);
  }

  public async update({
    chatId,
    admin,
  }: {
    chatId: number;
    admin: number;
  }): Promise<number> {
    const updateAdmin = await this.#UserModel
      .query()
      .patch({
        admin: admin,
      })
      .where({ chatId: chatId });
    return updateAdmin;
  }

  public async getAllAdmins(): Promise<UserEntity[]> {
    const admins = await this.#UserModel.query().where({ admin: 1 });
    return admins.map((admin) => UserRepository.modelToEntity(admin));
  }

  public static modelToEntity(model: UserM): UserEntity {
    return UserEntity.initialize(model);
  }
}

export { UserRepository };
