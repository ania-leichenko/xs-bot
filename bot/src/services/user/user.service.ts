import { user as userRep } from '~/data/repositories/repositories';
import { User as UserEntity } from './user.entity';

type Constructor = {
  userRepository: typeof userRep;
};

class User {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public async create({ chat_id, first_name, username, admin, joined, last_action }: UserEntity): Promise<void> {
    const user = await this.#userRepository.create({
      chat_id,
      first_name,
      username,
      admin,
      joined,
      last_action,
    });

    if (!user) {
      throw new Error();
    }
  }
}

export { User };
