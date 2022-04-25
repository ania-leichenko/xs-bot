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

  public async create({
    chatId,
    firstName,
    username,
    subcriptionTime,
    plan,
    paymentMethod,
    status,
  }: PaidListEntity): Promise<void> {
    const ticket = await this.#paidListRepository.create({
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    });

    if (!ticket) {
      throw new Error();
    }
  }
}

export { PaidList };
