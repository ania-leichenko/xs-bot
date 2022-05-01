import { botMessage as botMessageRep } from '~/data/repositories/repositories';
import { BotMessage as BotMessageEntity } from './bot-message.entity';

type Constructor = {
  botMessageRepository: typeof botMessageRep;
};

class BotMessage {
  #botMessageRepository: typeof botMessageRep;

  constructor({ botMessageRepository }: Constructor) {
    this.#botMessageRepository = botMessageRepository;
  }

  public async create({
    chatId,
    messageId,
    messageIdFromChannel,
    createdAt,
    updatedAt,
  }: BotMessageEntity): Promise<BotMessageEntity> {
    const newBotMessage = await this.#botMessageRepository.create({
      chatId,
      messageId,
      messageIdFromChannel,
      createdAt,
      updatedAt,
    });

    if (!newBotMessage) {
      throw new Error();
    }
    return newBotMessage;
  }

  async getByMessageId(messageId: number): Promise<BotMessageEntity[]> {
    return this.#botMessageRepository.getByMessageId(messageId);
  }
}

export { BotMessage };
