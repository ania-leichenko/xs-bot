import { channelMessage as channelMessageRep } from '~/data/repositories/repositories';
import { ChannelMessage as ChannelMessageEntity } from './channel-message.entity';

type Constructor = {
  channelMessageRepository: typeof channelMessageRep;
};

class ChannelMessage {
  #channelMessageRepository: typeof channelMessageRep;

  constructor({ channelMessageRepository }: Constructor) {
    this.#channelMessageRepository = channelMessageRepository;
  }

  public async create({
    channelId,
    messageId,
    message,
  }: {
    channelId: number;
    messageId: number;
    message: string;
  }): Promise<ChannelMessageEntity> {
    const newChannelMessage = this.#channelMessageRepository.create({
      channelId,
      messageId,
      message,
    });

    return newChannelMessage;
  }

  public async update({
    messageId,
    message,
    updatedAt,
  }: {
    messageId: number;
    message: string;
    updatedAt: Date;
  }): Promise<number> {
    const updateMessage = await this.#channelMessageRepository.update({
      messageId,
      message,
      updatedAt,
    });

    if (!updateMessage) {
      throw new Error();
    }
    return updateMessage;
  }
  async getByChannelMessageId({
    messageId,
    channelId,
  }: {
    messageId: number;
    channelId: number;
  }): Promise<ChannelMessageEntity | undefined> {
    return this.#channelMessageRepository.getByChannelMessageId({
      messageId,
      channelId,
    });
  }
}

export { ChannelMessage };
