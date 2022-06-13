class MessageFromBot {
  public chatId: number;

  private constructor({ chatId }: { chatId: number }) {
    this.chatId = chatId;
  }
  public static createNew({ chatId }: { chatId: number }): MessageFromBot {
    return new MessageFromBot({
      chatId,
    });
  }
}

export { MessageFromBot };
