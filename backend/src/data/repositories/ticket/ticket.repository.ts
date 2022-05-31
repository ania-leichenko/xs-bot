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
    plan,
  }: {
    ticket: number;
    subscriptionTime: Date;
    status: string;
    plan: string;
  }): Promise<number> {
    const updateTicket = await this.#TicketModel
      .query()
      .patch({
        subscriptionTime: subscriptionTime,
        status: status,
        plan: plan,
      })
      .where({ ticket: ticket });
    return updateTicket;
  }

  public async getTicketById({
    chatId,
    paymentMethod,
  }: {
    chatId: number;
    paymentMethod: string;
  }): Promise<TicketEntity | undefined> {
    const ticket = await this.#TicketModel
      .query()
      .where({ chatId: chatId })
      .where({ paymentMethod: paymentMethod })
      .first();
    return ticket;
  }

  public static modelToEntity(model: TicketM): TicketEntity {
    return TicketEntity.initialize(model);
  }
}

export { Ticket };
