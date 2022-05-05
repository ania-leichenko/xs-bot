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
    channelMessageId,
    createdAt,
    updatedAt,
  }: BotMessageEntity): Promise<BotMessageEntity> {
    const newBotMessage = await this.#botMessageRepository.create({
      chatId,
      messageId,
      channelMessageId,
      createdAt,
      updatedAt,
    });

    if (!newBotMessage) {
      throw new Error();
    }
    return newBotMessage;
  }

  async getByMessageId(id: string): Promise<BotMessageEntity[]> {
    // eslint-disable-next-line no-console
    //console.log(id);
    return this.#botMessageRepository.getByMessageId(id);
  }
}

export { BotMessage };
