import { PaidList as PaidListEntity } from '~/services/paid-list/paid-list.entity';
import { PaidList as PaidListM } from '../../models/models';

type Constructor = {
  PaidListModel: typeof PaidListM;
};

class PaidList {
  #PaidListModel: typeof PaidListM;

  constructor({ PaidListModel }: Constructor) {
    this.#PaidListModel = PaidListModel;
  }

  public async create(ticket: PaidListEntity): Promise<PaidListEntity> {
    const {
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    } = ticket;

    const newTicket = await this.#PaidListModel.query().insert({
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    });

    return PaidList.modelToEntity(newTicket);
  }

  public async getTicketById(chatId: number): Promise<PaidListEntity | null> {
    const ticket = await this.#PaidListModel.query().where({ chatId }).first();
    if (!ticket) return null;
    return PaidList.modelToEntity(ticket);
  }

  public static modelToEntity(model: PaidListM): PaidListEntity {
    const {
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    } = model;

    return PaidListEntity.createNew({
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    });
  }
}

export { PaidList };
