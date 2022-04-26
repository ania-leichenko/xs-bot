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
}

export { UserService };
