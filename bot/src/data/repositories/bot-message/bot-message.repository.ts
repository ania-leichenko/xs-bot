import { BotMessage as BotMessageEntity } from '~/services/bot-message/bot-message.entity';
import { BotMessage as BotMessageM } from '../../models/models';

type Constructor = {
  BotMessageModel: typeof BotMessageM;
};

class BotMessage {
  #BotMessageModel: typeof BotMessageM;

  constructor({ BotMessageModel }: Constructor) {
    this.#BotMessageModel = BotMessageModel;
  }

  public async create(
    bot_message: BotMessageEntity,
  ): Promise<BotMessageEntity> {
    const { chatId, messageId, messageIdFromChannel, createdAt, updatedAt } =
      bot_message;

    const newBotMessage = await this.#BotMessageModel.query().insert({
      chatId,
      messageId,
      messageIdFromChannel,
      createdAt,
      updatedAt,
    });

    return BotMessage.modelToEntity(newBotMessage);
  }

  public async getByMessageId(messageId: number): Promise<BotMessageEntity[]> {
    const botMessages = await this.#BotMessageModel
      .query()
      .where({ message_id_from_channel: messageId });
    return botMessages.map((botMessage) =>
      BotMessage.modelToEntity(botMessage),
    );
  }

  public static modelToEntity(model: BotMessageM): BotMessageEntity {
    const { chatId, messageId, messageIdFromChannel, createdAt, updatedAt } =
      model;

    return BotMessageEntity.createNew({
      chatId,
      messageId,
      messageIdFromChannel,
      createdAt,
      updatedAt,
    });
  }
}

export { BotMessage };
