import { Master as TMaster, MasterSignUpDto } from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { createToken } from '~/helpers/token/create-token/create-token.helper';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';

type Constructor = {
  masterRepository: typeof masterRep;
};

type MasterPromise = { token: string; user: MasterEntity };

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

  async login(id: string): Promise<MasterPromise> {
    return {
      token: createToken(id),
      user: (await this.#masterRepository.getByFilter(
        'id',
        id,
      )) as MasterEntity,
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpDto): Promise<MasterPromise | never> {
    const masterByEmail = await this.#masterRepository.getByFilter(
      'email',
      email,
    );
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const master = MasterEntity.createNew({
      name,
      email,
    });
    const newMaster = await this.#masterRepository.create(password, master);

    return this.login(newMaster.id);
  }
}

export { Master };
