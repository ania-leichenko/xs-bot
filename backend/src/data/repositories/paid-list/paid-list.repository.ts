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
    const tickets = await this.#PaidListModel.query();
    return tickets.map((ticket) => PaidList.modelToEntity(ticket));
  }

  public static modelToEntity(model: PaidListM): PaidListEntity {
    return PaidListEntity.initialize(model);
  }
}

export { PaidList };
