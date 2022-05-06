class MessageForUsers {
  public chatId: number;
  public message: string;

  private constructor({
    chatId,
    message,
  }: {
    chatId: number;
    message: string;
  }) {
    this.chatId = chatId;
    this.message = message;
  }
  public static createNew({
    chatId,
    message,
  }: {
    chatId: number;
    message: string;
  }): MessageForUsers {
    return new MessageForUsers({
      chatId,
      message,
    });
  }
}

export { MessageForUsers };
