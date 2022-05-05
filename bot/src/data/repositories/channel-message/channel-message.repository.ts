import { ChannelMessage as ChannelMessageEntity } from '~/services/channel-message/channel-message.entity';
import { ChannelMessage as ChannelMessageM } from '../../models/models';

type Constructor = {
  ChannelMessageModel: typeof ChannelMessageM;
};

class ChannelMessage {
  #ChannelMessageModel: typeof ChannelMessageM;

  constructor({ ChannelMessageModel }: Constructor) {
    this.#ChannelMessageModel = ChannelMessageModel;
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

    const newChannelMessage = await this.#ChannelMessageModel
      .query()
      .insert({
        channelId,
        messageId,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning('id');

    return ChannelMessage.modelToEntity(newChannelMessage);
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
    const updateMessage = await this.#ChannelMessageModel
      .query()
      .patch({ message: message, updatedAt: updatedAt })
      .where({ messageId: messageId });
    return updateMessage;
  }

  public async getByChannelMessageId({
    messageId,
    channelId,
  }: {
    messageId: number;
    channelId: number;
  }): Promise<ChannelMessageEntity | undefined> {
    return this.#ChannelMessageModel
      .query()
      .where({ messageId: messageId, channelId: channelId })
      .first();
  }

  public static modelToEntity(model: ChannelMessageM): ChannelMessageEntity {
    const { id, channelId, messageId, message } = model;

    return ChannelMessageEntity.createNew({
      id,
      channelId,
      messageId,
      message,
    });
  }
}

export { ChannelMessage };
