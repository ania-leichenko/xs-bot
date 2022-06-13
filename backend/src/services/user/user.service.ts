import { users as usersRep } from '~/data/repositories/repositories';
import { User as UserEntity } from './user.entity';
import {
  messageForUsers as messageForUsersServ,
  ticket as ticketServ,
  messageFromBot as messageFromBotServ,
} from '~/services/services';

type Constructor = {
  usersRepository: typeof usersRep;
};

class UserService {
  #usersRepository: typeof usersRep;

  constructor({ usersRepository }: Constructor) {
    this.#usersRepository = usersRepository;
  }
  public async getUserById(id: number): Promise<UserEntity | undefined> {
    return this.#usersRepository.getUserById(id);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.#usersRepository.getAllUsers();
  }

  public async delete(id: number): Promise<void> {
    await messageFromBotServ.delete(id);
    await messageForUsersServ.delete(id);
    await ticketServ.delete(id);
    await this.#usersRepository.delete(id);
  }

  public async update({
    chatId,
    admin,
    countOfSubscription,
  }: {
    chatId: number;
    admin: number;
    countOfSubscription: number;
  }): Promise<number> {
    const updateAdmin = await this.#usersRepository.update({
      chatId,
      admin,
      countOfSubscription,
    });

    if (!updateAdmin) {
      throw new Error();
    }
    return updateAdmin;
  }

  public async updateCount({
    countOfSubscription,
    chatId,
  }: {
    countOfSubscription: number;
    chatId: number;
  }): Promise<number> {
    const updateCount = await this.#usersRepository.updateCount({
      countOfSubscription,
      chatId,
    });

    if (!updateCount) {
      throw new Error();
    }
    return updateCount;
  }

  async getAllAdmins(): Promise<UserEntity[]> {
    return this.#usersRepository.getAllAdmins();
  }
}

export { UserService };
