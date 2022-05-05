import { ticket as ticketRep } from '~/data/repositories/repositories';
import { Ticket as TicketEntity } from './ticket.entity';

type Constructor = {
  ticketRepository: typeof ticketRep;
};

class Ticket {
  #ticketRepository: typeof ticketRep;

  constructor({ ticketRepository }: Constructor) {
    this.#ticketRepository = ticketRepository;
  }

  public async create({
    chatId,
    firstName,
    username,
    subscriptionTime,
    plan,
    paymentMethod,
    status,
    country,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    subscriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }): Promise<TicketEntity> {
    const tickets = await this.#ticketRepository.create({
      chatId,
      firstName,
      username,
      subscriptionTime,
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
  ): Promise<TicketEntity[]> {
    return this.#ticketRepository.getUserByChannelPlan(channel_plan);
  }
  public async getTicketByChatId(chatId: number): Promise<TicketEntity[]> {
    return this.#ticketRepository.getTicketByChatId(chatId);
  }
}

export { Ticket };
