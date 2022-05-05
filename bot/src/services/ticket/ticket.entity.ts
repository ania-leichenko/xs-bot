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
  }
  public static createNew({
    ticket,
    chatId,
    firstName,
    username,
    subscriptionTime,
    plan,
    paymentMethod,
    status,
    country,
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
    });
  }
}

export { Ticket };
