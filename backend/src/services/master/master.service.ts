import { MasterDto, MasterSignUpDto } from 'bws-shared/dtos/dtos';
import { masterRepository as masterRep } from '~/data/repositories/repositories';
import { MasterEntity } from './master.entity';

type Constructor = {
  masterRepository: typeof masterRep;
};

class MasterService {
  #masterRepository: typeof masterRep;

  constructor({ masterRepository }: Constructor) {
    this.#masterRepository = masterRepository;
  }

  async getAll(): Promise<MasterDto[]> {
    const masters = await this.#masterRepository.getAll();

    return masters.map((m) => {
      const master: MasterDto = {
        id: m.id,
        email: m.email,
      };
      return master;
    });
  }

  async create(createMasterDto: MasterSignUpDto): Promise<void> {
    const master = MasterEntity.createNew({
      name: createMasterDto.name,
      email: createMasterDto.email,
    });
    await this.#masterRepository.create(master);
  }
}

export { MasterService };
