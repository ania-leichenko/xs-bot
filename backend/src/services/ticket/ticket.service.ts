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

  public async delete(id: number): Promise<void> {
    await this.#ticketRepository.delete(id);
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
    const updateTicket = await this.#ticketRepository.update({
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

export { Ticket };
