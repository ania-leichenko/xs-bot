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

  async getAllTickets(): Promise<TicketEntity[]> {
    return this.#ticketRepository.getAllTickets();
  }

  public async softDelete(id: number): Promise<void> {
    await this.#ticketRepository.softDelete(id);
  }

  public async updateStatus(id: number): Promise<void> {
    await this.#ticketRepository.updateStatus(id);
  }

  public async update({
    ticket,
    subscriptionTime,
    status,
    plan,
  }: {
    ticket: number;
    subscriptionTime: Date;
    status: string;
    plan: string;
  }): Promise<number> {
    const updateTicket = await this.#ticketRepository.update({
      ticket,
      subscriptionTime,
      status,
      plan,
    });

    if (!updateTicket) {
      throw new Error();
    }
    return updateTicket;
  }
  public async getTicketById(chatId: number, paymentMethod: string):Promise<TicketEntity | undefined> {
   return this.#ticketRepository.getTicketById({ chatId, paymentMethod });
  }
}

export { Ticket };
