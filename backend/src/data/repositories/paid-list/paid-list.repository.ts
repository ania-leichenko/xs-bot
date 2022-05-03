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

  public async getAllTickets(): Promise<PaidListEntity[]> {
    const tickets = await this.#PaidListModel
      .query()
      .orderBy('subcriptionTime', 'asc');
    return tickets.map((ticket) => PaidList.modelToEntity(ticket));
  }

  public async delete(id: number): Promise<number> {
    return this.#PaidListModel.query().deleteById(id);
  }

  public async update({
    ticket,
    subcriptionTime,
    status,
  }: {
    ticket: number;
    subcriptionTime: Date;
    status: string;
  }): Promise<number> {
    const updateTicket = await this.#PaidListModel
      .query()
      .patch({
        subcriptionTime: subcriptionTime,
        status: status,
      })
      .where({ ticket: ticket });
    return updateTicket;
  }

  public static modelToEntity(model: PaidListM): PaidListEntity {
    return PaidListEntity.initialize(model);
  }
}

export { PaidList };
