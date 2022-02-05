import { Master as TMaster, MasterSignUpDto } from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';

type Constructor = {
  masterRepository: typeof masterRep;
};

class Master {
  #masterRepository: typeof masterRep;

  constructor({ masterRepository }: Constructor) {
    this.#masterRepository = masterRepository;
  }

  async getAll(): Promise<TMaster[]> {
    const masters = await this.#masterRepository.getAll();

    return masters.map((m) => ({
      id: m.id,
      email: m.email,
    }));
  }

  async create(createMasterDto: MasterSignUpDto): Promise<void> {
    const master = MasterEntity.createNew({
      name: createMasterDto.name,
      email: createMasterDto.email,
    });
    await this.#masterRepository.create(createMasterDto.password, master);
  }
}

export { Master };
