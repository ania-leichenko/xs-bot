import { users as usersRep } from '~/data/repositories/repositories';
import { User as UserEntity } from './user.entity';

type Constructor = {
  usersRepository: typeof usersRep;
};

class UserService {
  #usersRepository: typeof usersRep;

  constructor({ usersRepository }: Constructor) {
    this.#usersRepository = usersRepository;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.#usersRepository.getAllUsers();
  }

  public async delete(id: number): Promise<void> {
    await this.#usersRepository.delete(id);
  }

  public async update({
    chatId,
    admin,
  }: {
    chatId: number;
    admin: number;
  }): Promise<number> {
    const updateAdmin = await this.#usersRepository.update({
      chatId,
      admin,
    });

    if (!updateAdmin) {
      throw new Error();
    }
    return updateAdmin;
  }
}

export { UserService };
