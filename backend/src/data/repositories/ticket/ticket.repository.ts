import { Ticket as TicketEntity } from '~/services/ticket/ticket.entity';
import { Ticket as TicketM } from '../../models/models';

type Constructor = {
  TicketModel: typeof TicketM;
};

class Ticket {
  #TicketModel: typeof TicketM;

  constructor({ TicketModel }: Constructor) {
    this.#TicketModel = TicketModel;
  }

  public async getAllTickets(): Promise<TicketEntity[]> {
    const tickets = await this.#TicketModel
      .query()
      .orderBy('subcriptionTime', 'asc');
    return tickets.map((ticket) => Ticket.modelToEntity(ticket));
  }

  public async delete(id: number): Promise<number> {
    return this.#TicketModel.query().deleteById(id);
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
    const updateTicket = await this.#TicketModel
      .query()
      .patch({
        subcriptionTime: subcriptionTime,
        status: status,
      })
      .where({ ticket: ticket });
    return updateTicket;
  }

  public static modelToEntity(model: TicketM): TicketEntity {
    return TicketEntity.initialize(model);
  }
}

export { Ticket };
