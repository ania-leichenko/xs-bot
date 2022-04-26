import { paidList as paidListRep } from '~/data/repositories/repositories';
import { PaidList as PaidListEntity } from './paid-list.entity';

type Constructor = {
  paidListRepository: typeof paidListRep;
};

class PaidList {
  #paidListRepository: typeof paidListRep;

  constructor({ paidListRepository }: Constructor) {
    this.#paidListRepository = paidListRepository;
  }

  async getAllTickets(): Promise<PaidListEntity[]> {
    return this.#paidListRepository.getAllTickets();
  }
}

export { PaidList };
