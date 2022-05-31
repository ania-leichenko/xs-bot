class User {
  public chatId: number;
  public firstName: string;
  public username?: string;
  public admin: number;
  public joined: Date;
  public lastAction: Date;
  public countOfSubscription: number;

  private constructor({
    chatId,
    firstName,
    username,
    admin,
    joined,
    lastAction,
    countOfSubscription,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    admin: number;
    joined: Date;
    lastAction: Date;
    countOfSubscription: number;
  }) {
    this.chatId = chatId;
    this.firstName = firstName;
    this.username = username;
    this.admin = admin;
    this.joined = joined;
    this.lastAction = lastAction;
    this.countOfSubscription = countOfSubscription;
  }
  public static initialize({
    chatId,
    firstName,
    username,
    admin,
    joined,
    lastAction,
    countOfSubscription,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    admin: number;
    joined: Date;
    lastAction: Date;
    countOfSubscription: number;
  }): User {
    return new User({
      chatId,
      firstName,
      username,
      admin,
      joined,
      lastAction,
      countOfSubscription,
    });
  }
}

export { User };
