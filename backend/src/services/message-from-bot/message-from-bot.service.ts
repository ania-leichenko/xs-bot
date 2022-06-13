import { messageFromBot as messageFromBotRep } from '~/data/repositories/repositories';

type Constructor = {
  messageFromBotRepository: typeof messageFromBotRep;
};

class MessageFromBot {
  #messageFromBotRepository: typeof messageFromBotRep;

  constructor({ messageFromBotRepository }: Constructor) {
    this.#messageFromBotRepository = messageFromBotRepository;
  }

  public async delete(id: number): Promise<void> {
    await this.#messageFromBotRepository.delete(id);
  }
}

export { MessageFromBot };
