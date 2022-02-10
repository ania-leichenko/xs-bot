import { worker as masterRep } from '~/data/repositories/repositories';

type Constructor = {
  masterRepository: typeof masterRep;
};

class Worker {
  #masterRepository: typeof masterRep;

  constructor({ masterRepository }: Constructor) {
    this.#masterRepository = masterRepository;
  }
}

export { Worker };
