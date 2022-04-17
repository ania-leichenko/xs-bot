class UserMessage {
  public chat_id: number;
  public text?: string;
    public date: Date;

 constructor({
    chat_id,
    text,
    date,
  }: {
    chat_id: number;
    text: string;
    date: Date;
  }) {
    this.chat_id = chat_id;
    this.text = text;
    this.date = date;
  }
  public static createNew({
    chat_id,
    text,
    date,
  }: {
    chat_id: number;
    text: string;
    date: Date;
  }): UserMessage {
    return new UserMessage({
      chat_id,
      text,
      date,
    });
  }
}

export { UserMessage };
