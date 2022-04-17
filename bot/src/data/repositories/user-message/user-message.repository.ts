import { UserMessage as UserMessageEntity } from '~/services/user-message/user-message.entity';
import { UserMessage as UserMessageM } from '../../models/models';

type Constructor = {
  UserMessageModel: typeof UserMessageM;
};

class UserMessage {
  #UserMessageModel: typeof UserMessageM;

  constructor({ UserMessageModel }: Constructor) {
    this.#UserMessageModel = UserMessageModel;
  }

  public async create(
    user_message: UserMessageEntity,
  ): Promise<UserMessageEntity> {
    const { chat_id, text, date } = user_message;

    const newUserMessage = await this.#UserMessageModel.query().insert({
      chat_id,
      text,
      date,
    });

    return UserMessage.modelToEntity(newUserMessage);
  }

  public static modelToEntity(model: UserMessageM): UserMessageEntity {
    const { chat_id, text, date } = model;

    return UserMessageEntity.createNew({
      chat_id,
      text,
      date,
    });
  }
}

export { UserMessage };
