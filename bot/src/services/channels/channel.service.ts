import { channel as channelRep } from '~/data/repositories/repositories';
import { Channel as ChannelEntity } from './channel.entity';

type Constructor = {
  channelRepository: typeof channelRep;
};

class Channel {
  #channelRepository: typeof channelRep;

  constructor({ channelRepository }: Constructor) {
    this.#channelRepository = channelRepository;
  }

  public async getChannelById(channelId: number): Promise<ChannelEntity | null> {
    return this.#channelRepository.getChannelById(channelId);
  }
}

export { Channel };
