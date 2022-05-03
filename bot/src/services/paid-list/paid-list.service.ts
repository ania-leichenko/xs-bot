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
    country,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }): Promise<PaidListEntity> {
    const tickets = await this.#paidListRepository.create({
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    });

    if (!tickets) {
      throw new Error();
    }
    return tickets;
  }
  public async getUserByChannelPlan(
    channel_plan: string,
  ): Promise<PaidListEntity[]> {
    return this.#paidListRepository.getUserByChannelPlan(channel_plan);
  }
  public async getTicketByChatId(chatId: number): Promise<PaidListEntity[]> {
    return this.#paidListRepository.getTicketByChatId(chatId);
  }
}

export { PaidList };
