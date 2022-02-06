import {
  MasterDto as TMaster,
  MasterSignUpDto,
  MasterSignUpRequestDto,
} from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { createToken } from '~/helpers/token/create-token/create-token.helper';
import { MASTER_PASSWORD_SALT_ROUNDS as saltRounds } from '~/common/constants/master.constants';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';
import { createSalt, encrypt } from '~/helpers/crypt/encrypt/encrypt.helper';

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

  async login(id: string): Promise<MasterSignUpDto> {
    const { email } = (await this.#masterRepository.getById(
      id,
    )) as MasterEntity;
    return {
      token: createToken(id),
      email,
      id,
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpRequestDto): Promise<MasterSignUpDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = createSalt(saltRounds);
    const passwordHash = await encrypt(password, passwordSalt);
    const master = MasterEntity.createNew({
      name,
      email,
    });
    const { id } = await this.#masterRepository.create({
      ...master,
      passwordSalt,
      passwordHash,
    });

    return this.login(id);
  }
}

export { Master };
