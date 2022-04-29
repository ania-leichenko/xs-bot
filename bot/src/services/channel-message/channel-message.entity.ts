class ChannelMessage {
  public channelId: number;
  public messageId: number;
  public message: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    channelId,
    messageId,
    message,
    createdAt,
    updatedAt,
  }: {
    channelId: number;
    messageId: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.channelId = channelId;
    this.messageId = messageId;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  public static createNew({
    channelId,
    messageId,
    message,
    createdAt,
    updatedAt,
  }: {
    channelId: number;
    messageId: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }): ChannelMessage {
    return new ChannelMessage({
      channelId,
      messageId,
      message,
      createdAt,
      updatedAt,
    });
  }
}

export { ChannelMessage };
