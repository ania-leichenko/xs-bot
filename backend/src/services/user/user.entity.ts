class User {
  public chatId: number;
  public firstName: string;
  public username?: string;
  public admin: number;
  public joined: Date;
  public lastAction: Date;

  private constructor({
    chatId,
    firstName,
    username,
    admin,
    joined,
    lastAction,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    admin: number;
    joined: Date;
    lastAction: Date;
  }) {
    this.chatId = chatId;
    this.firstName = firstName;
    this.username = username;
    this.admin = admin;
    this.joined = joined;
    this.lastAction = lastAction;
  }
  public static initialize({
    chatId,
    firstName,
    username,
    admin,
    joined,
    lastAction,
  }: {
    chatId: number;
    firstName: string;
    username: string;
    admin: number;
    joined: Date;
    lastAction: Date;
  }): User {
    return new User({
      chatId,
      firstName,
      username,
      admin,
      joined,
      lastAction,
    });
  }
}

export { User };
