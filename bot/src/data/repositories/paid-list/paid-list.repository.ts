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

  public async create(ticket: {
    chatId: number;
    firstName: string;
    username: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }): Promise<PaidListEntity> {
    const {
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    } = ticket;

    const newTicket = await this.#PaidListModel
      .query()
      .insert({
        chatId,
        firstName,
        username,
        subcriptionTime,
        plan,
        paymentMethod,
        status,
        country,
      })
      .returning('ticket');

    return PaidList.modelToEntity(newTicket);
  }

  public async getUserByChannelPlan(
    channel_plan: string,
  ): Promise<PaidListEntity[]> {
    const users = await this.#PaidListModel
      .query()
      .where({ plan: channel_plan })
      .where('subcription_time', '>', new Date());
    return users.map((user) => PaidList.modelToEntity(user));
  }

  public static modelToEntity(model: PaidListM): PaidListEntity {
    const {
      ticket,
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    } = model;

    return PaidListEntity.createNew({
      ticket,
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    });
  }
}

export { PaidList };
