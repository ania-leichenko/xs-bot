import { messageForUsers as messageForUsersRep } from '~/data/repositories/repositories';
import { MessageForUsers as MessageForUsersEntity } from './message-for-user.entity';

type Constructor = {
  messageForUsersRepository: typeof messageForUsersRep;
};

class MessageForUsers {
  #messageForUsersRepository: typeof messageForUsersRep;

  constructor({ messageForUsersRepository }: Constructor) {
    this.#messageForUsersRepository = messageForUsersRepository;
  }

  public async create({
    chatId,
    message,
  }: {
    chatId: number;
    message: string;
  }): Promise<MessageForUsersEntity> {
    const messageForUser = await this.#messageForUsersRepository.create({
      chatId,
      message,
    });
    return messageForUser;
  }

  public async delete(id: number): Promise<void> {
    await this.#messageForUsersRepository.delete(id);
  }
}

export { MessageForUsers };
