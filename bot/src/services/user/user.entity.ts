class User {
  public chat_id: number;
  public first_name: string;
  public username: string;
  public admin: number;
  public joined: Date;
  public last_action: Date;

  private constructor({
    chat_id,
    first_name,
    username,
    admin,
    joined,
    last_action,
  }: {
    chat_id: number;
    first_name: string;
    username: string;
    admin: number;
    joined: Date;
    last_action: Date;
  }) {
    this.chat_id = chat_id;
    this.first_name = first_name;
    this.username = username;
    this.admin = admin;
    this.joined = joined;
    this.last_action = last_action;
  }
  public static createNew({
    chat_id,
    first_name,
    username,
    admin,
    joined,
    last_action,
  }: {
    chat_id: number;
    first_name: string;
    username: string;
    admin: number;
    joined: Date;
    last_action: Date;
  }): User {
    return new User({
      chat_id,
      first_name,
      username,
      admin,
      joined,
      last_action,
    });
  }
}

export { User };
