import { MessageForUsers as MessageForUsersEntity } from '~/services/message-for-users/message-for-user.entity';
import { MessageForUsers as MessageForUsersM } from '../../models/models';

type Constructor = {
  MessageForUsersModel: typeof MessageForUsersM;
};

class MessageForUsers {
  #MessageForUsersModel: typeof MessageForUsersM;

  constructor({ MessageForUsersModel }: Constructor) {
    this.#MessageForUsersModel = MessageForUsersModel;
  }

  public async create({
    chatId,
    message,
  }: {
    chatId: number;
    message: string;
  }): Promise<MessageForUsersEntity> {
    return this.#MessageForUsersModel.query().insert({
      chatId,
      message,
    });
  }

  public async delete(usersId: number): Promise<number> {
    return this.#MessageForUsersModel.query().deleteById(usersId);
  }

  public static modelToEntity(model: MessageForUsersM): MessageForUsersEntity {
    const { chatId, message } = model;

    return MessageForUsersEntity.createNew({
      chatId,
      message,
    });
  }
}

export { MessageForUsers };
