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

  public async create(
    channel_message: ChannelMessageEntity,
  ): Promise<ChannelMessageEntity> {
    const { channelId, messageId, message, createdAt, updatedAt } =
      channel_message;

    const newChannelMessage = await this.#ChannelMessageModel.query().insert({
      channelId,
      messageId,
      message,
      createdAt,
      updatedAt,
    });

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
  }): Promise<ChannelMessageEntity> {
    const updateMessage = await this.#ChannelMessageModel
      .query()
      .patch({ message: message, updatedAt: updatedAt })
      .where({ messageId: messageId });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ChannelMessage.modelToEntity(updateMessage);
  }

  public static modelToEntity(model: ChannelMessageM): ChannelMessageEntity {
    const { channelId, messageId, message, createdAt, updatedAt } = model;

    return ChannelMessageEntity.createNew({
      channelId,
      messageId,
      message,
      createdAt,
      updatedAt,
    });
  }
}

export { ChannelMessage };
