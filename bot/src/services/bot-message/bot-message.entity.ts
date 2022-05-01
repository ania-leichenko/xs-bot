class BotMessage {
  public chatId: number;
  public messageId: number;
  public messageIdFromChannel: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    chatId,
    messageId,
    messageIdFromChannel,
    createdAt,
    updatedAt,
  }: {
    chatId: number;
    messageId: number;
    messageIdFromChannel: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.chatId = chatId;
    this.messageId = messageId;
    this.messageIdFromChannel = messageIdFromChannel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  public static createNew({
    chatId,
    messageId,
    messageIdFromChannel,
    createdAt,
    updatedAt,
  }: {
    chatId: number;
    messageId: number;
    messageIdFromChannel: number;
    createdAt: Date;
    updatedAt: Date;
  }): BotMessage {
    return new BotMessage({
      chatId,
      messageId,
      messageIdFromChannel,
      createdAt,
      updatedAt,
    });
  }
}

export { BotMessage };
