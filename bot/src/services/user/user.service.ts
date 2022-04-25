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

  public async create({
    chatId,
    firstName,
    username,
    admin,
    joined,
    lastAction,
  }: UserEntity): Promise<void> {
    const user = await this.#userRepository.create({
      chatId,
      firstName,
      username,
      admin,
      joined,
      lastAction,
    });

    if (!user) {
      throw new Error();
    }
  }

  public async getUserById(chatId: number): Promise<UserEntity | null> {
    return this.#userRepository.getUserById(chatId);
  }

  public async checkIsAdmin(chatId: number): Promise<boolean> {
    const user =  await this.#userRepository.getUserById(chatId);
    if (user?.admin === 1) {
      return true;
    }
    return false;
  }
}

export { User };
