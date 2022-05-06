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
      .orderBy('subscriptionTime', 'asc');
    return tickets.map((ticket) => Ticket.modelToEntity(ticket));
  }

  public async delete(id: number): Promise<number> {
    return this.#TicketModel.query().deleteById(id);
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
    const updateTicket = await this.#TicketModel
      .query()
      .patch({
        subscriptionTime: subscriptionTime,
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
