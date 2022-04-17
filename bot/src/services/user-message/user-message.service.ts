import { userMessage as userMessageRep } from '~/data/repositories/repositories';
import { UserMessage as UserMessageEntity } from './user-message.entity';

type Constructor = {
  userMessageRepository: typeof userMessageRep;
};

class UserMessage {
  #userMessageRepository: typeof userMessageRep;

  constructor({ userMessageRepository }: Constructor) {
    this.#userMessageRepository = userMessageRepository;
  }

  public async create({
    chat_id,
    text,
    date,
  }: UserMessageEntity): Promise<void> {
    const userMessage = await this.#userMessageRepository.create({
      chat_id,
      text,
      date,
    });

    if (!userMessage) {
      throw new Error();
    }
  }
}

export { UserMessage };
