class Channel {
  public channelId: number;
  public plan: string;

  private constructor({
    channelId,
    plan,
  }: {
    channelId: number;
    plan: string;
  }) {
    this.channelId = channelId;
    this.plan = plan;
  }
  public static createNew({
    channelId,
    plan,
  }: {
    channelId: number;
    plan: string;
  }): Channel {
    return new Channel({
      channelId,
      plan,
    });
  }
}

export { Channel };
