class ChannelMessage {
  public id: string;
  public channelId: number;
  public messageId: number;
  public message: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    channelId,
    messageId,
    message,
    createdAt,
    updatedAt,
  }: {
    id: string;
    channelId: number;
    messageId: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.channelId = channelId;
    this.messageId = messageId;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  public static createNew({
    id,
    channelId,
    messageId,
    message,
  }: {
    id: string;
    channelId: number;
    messageId: number;
    message: string;
  }): ChannelMessage {
    return new ChannelMessage({
      id,
      channelId,
      messageId,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export { ChannelMessage };
