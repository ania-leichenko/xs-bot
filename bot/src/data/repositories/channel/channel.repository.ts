import { Channel as ChannelEntity } from '~/services/channels/channel.entity';
import { Channel as ChannelM } from '../../models/models';

type Constructor = {
  ChannelModel: typeof ChannelM;
};

class Channel {
  #ChannelModel: typeof ChannelM;

  constructor({ ChannelModel }: Constructor) {
    this.#ChannelModel = ChannelModel;
  }

  public async getChannelById(
    channelId: number,
  ): Promise<ChannelEntity | null> {
    const channel = await this.#ChannelModel
      .query()
      .where({ channelId })
      .first();
    if (!channel) return null;
    return Channel.modelToEntity(channel);
  }

  public static modelToEntity(model: ChannelM): ChannelEntity {
    const { channelId, plan } = model;

    return ChannelEntity.createNew({
      channelId,
      plan,
    });
  }
}

export { Channel };
