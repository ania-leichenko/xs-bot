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

  public async softDelete(id: number): Promise<number> {
    return this.#TicketModel
      .query()
      .patch({
        deletedAt: new Date(),
      })
      .where({ ticket: id });
  }

  public async updateStatus(id: number): Promise<number> {
    return this.#TicketModel
      .query()
      .patch({
        status: 'Inactive',
      })
      .where({ ticket: id });
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
