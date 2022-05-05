class BotMessage {
  public chatId: number;
  public messageId: number;
  public channelMessageId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    chatId,
    messageId,
    channelMessageId,
    createdAt,
    updatedAt,
  }: {
    chatId: number;
    messageId: number;
    channelMessageId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.chatId = chatId;
    this.messageId = messageId;
    this.channelMessageId = channelMessageId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  public static createNew({
    chatId,
    messageId,
    channelMessageId,
    createdAt,
    updatedAt,
  }: {
    chatId: number;
    messageId: number;
    channelMessageId: string;
    createdAt: Date;
    updatedAt: Date;
  }): BotMessage {
    return new BotMessage({
      chatId,
      messageId,
      channelMessageId,
      createdAt,
      updatedAt,
    });
  }
}

export { BotMessage };
