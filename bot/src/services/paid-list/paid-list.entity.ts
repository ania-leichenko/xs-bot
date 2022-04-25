class PaidList {
  public chatId: number;
  public firstName: string;
  public username?: string;
  public subcriptionTime: Date;
  public plan: string;
  public paymentMethod: string;
  public status: string;

  private constructor({
    chatId,
    firstName,
    username,
    subcriptionTime,
    plan,
    paymentMethod,
    status,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
  }) {
    this.chatId = chatId;
    this.firstName = firstName;
    this.username = username;
    this.subcriptionTime = subcriptionTime;
    this.plan = plan;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
  public static createNew({
    chatId,
    firstName,
    username,
    subcriptionTime,
    plan,
    paymentMethod,
    status,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    subcriptionTime: Date;
    plan: string;
    paymentMethod: string;
    status: string;
  }): PaidList {
    return new PaidList({
      chatId,
      firstName,
      username,
      subcriptionTime,
      plan,
      paymentMethod,
      status,
    });
  }
}

export { PaidList };
