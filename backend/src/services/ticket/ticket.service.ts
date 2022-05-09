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
  }: {
    ticket: number;
    subscriptionTime: Date;
    status: string;
  }): Promise<number> {
    const updateTicket = await this.#ticketRepository.update({
      ticket,
      subscriptionTime,
      status,
    });

    if (!updateTicket) {
      throw new Error();
    }
    return updateTicket;
  }
}

export { Ticket };
