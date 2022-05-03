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

  public async delete(id: number): Promise<void> {
    await this.#paidListRepository.delete(id);
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
    const updateTicket = await this.#paidListRepository.update({
      ticket,
      subcriptionTime,
      status,
    });

    if (!updateTicket) {
      throw new Error();
    }
    return updateTicket;
  }
}

export { PaidList };
