class Ticket {
  public ticket: number;
  public chatId: number;
  public firstName: string;
  public username?: string;
  public subscriptionTime: Date;
  public plan: string;
  public paymentMethod: string;
  public status: string;
  public country: string;
  public deletedAt?: Date | null;

  private constructor({
    ticket,
    chatId,
    firstName,
    username,
    subscriptionTime,
    plan,
    paymentMethod,
    status,
    country,
    deletedAt,
  }: {
    ticket: number;
    chatId: number;
    firstName: string;
    username?: string;
    subscriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
    deletedAt: Date | null;
  }) {
    this.ticket = ticket;
    this.chatId = chatId;
    this.firstName = firstName;
    this.username = username;
    this.subscriptionTime = subscriptionTime;
    this.plan = plan;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.country = country;
    this.deletedAt = deletedAt;
  }
  public static initialize({
    ticket,
    chatId,
    firstName,
    username,
    subscriptionTime,
    plan,
    paymentMethod,
    status,
    country,
    deletedAt,
  }: {
    ticket: number;
    chatId: number;
    firstName: string;
    username?: string;
    subscriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
    deletedAt: Date | null;
  }): Ticket {
    return new Ticket({
      ticket,
      chatId,
      firstName,
      username,
      subscriptionTime,
      plan,
      paymentMethod,
      status,
      country,
      deletedAt,
    });
  }
}

export { Ticket };
