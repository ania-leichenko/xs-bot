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

  public async create(ticket: {
    chatId: number;
    firstName: string;
    username: string;
    subscriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }): Promise<TicketEntity> {
    const {
      chatId,
      firstName,
      username,
      subscriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    } = ticket;

    const newTicket = await this.#TicketModel
      .query()
      .insert({
        chatId,
        firstName,
        username,
        subscriptionTime,
        plan,
        paymentMethod,
        status,
        country,
      })
      .returning('ticket');

    return Ticket.modelToEntity(newTicket);
  }

  public async getUserByChannelPlan(
    channel_plan: string,
  ): Promise<TicketEntity[]> {
    const usersQuery = this.#TicketModel
      .query()
      .where('subscription_time', '>', new Date())
      .where('status', '=', 'Active');
    if (channel_plan !== 'All') {
      usersQuery.where({ plan: channel_plan });
    }

    const users = await usersQuery;
    return users.map((user: TicketM) => Ticket.modelToEntity(user));
  }

  public async getTicketByChatId(chatId: number): Promise<TicketEntity[]> {
    const tickets = await this.#TicketModel.query().where({ chatId });
    return tickets.map((ticket: TicketM) => Ticket.modelToEntity(ticket));
  }

  public async getTicketByStatus(
    chatId: number,
    plan: string,
    status: string,
  ): Promise<TicketEntity | undefined> {
    return this.#TicketModel
      .query()
      .where({ chatId: chatId, plan: plan, status: status })
      .first();
  }

  public async getTicketByPLan(chatId: number): Promise<TicketEntity[]> {
    return this.#TicketModel
      .query()
      .where({ chatId: chatId, status: 'Active' })
      .orWhere({ chatId: chatId, status: 'Pending' });
  }

  public static modelToEntity(model: TicketM): TicketEntity {
    const {
      ticket,
      chatId,
      firstName,
      username,
      subscriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    } = model;

    return TicketEntity.createNew({
      ticket,
      chatId,
      firstName,
      username,
      subscriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    });
  }
}

export { Ticket };
