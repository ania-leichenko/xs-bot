import { MessageFromBot as MessageFromBotEntity } from '~/services/message-from-bot/message-from-bot.entity';
import { MessageFromBot as MessageFromBotM } from '../../models/models';

type Constructor = {
  MessageFromBotModel: typeof MessageFromBotM;
};

class MessageFromBot {
  #MessageFromBotModel: typeof MessageFromBotM;

  constructor({ MessageFromBotModel }: Constructor) {
    this.#MessageFromBotModel = MessageFromBotModel;
  }

  public async delete(usersId: number): Promise<number> {
    return this.#MessageFromBotModel.query().deleteById(usersId);
  }

  public static modelToEntity(model: MessageFromBotM): MessageFromBotEntity {
    const { chatId } = model;

    return MessageFromBotEntity.createNew({
      chatId,
    });
  }
}

export { MessageFromBot };
