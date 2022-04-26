class PaidList {
  public ticket: number;
  public chatId: number;
  public firstName: string;
  public username?: string;
  public subcriptionTime: Date;
  public plan: string;
  public paymentMethod: string;
  public status: string;
  public country: string;

  private constructor({
    ticket,
    chatId,
    firstName,
    username,
    subcriptionTime,
    plan,
    paymentMethod,
    status,
    country,
  }: {
    ticket: number;
    chatId: number;
    firstName: string;
    username?: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }) {
    this.ticket = ticket;
    this.chatId = chatId;
    this.firstName = firstName;
    this.username = username;
    this.subcriptionTime = subcriptionTime;
    this.plan = plan;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.country = country;
  }
  public static initialize({
    ticket,
    chatId,
    firstName,
    username,
    subcriptionTime,
    plan,
    paymentMethod,
    status,
    country,
  }: {
    ticket: number;
    chatId: number;
    firstName: string;
    username?: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
    country: string;
  }): PaidList {
    return new PaidList({
      ticket,
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
      country,
    });
  }
}

export { PaidList };
