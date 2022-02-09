import {
  MasterDto as TMaster,
  MasterSignUpRequestDto,
  MasterSignUpResponseDto,
} from '~/common/types/types';
import { masterRepository as MasterRepository } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  tokenService as TokenService,
  encryptService as EncryptService,
  tenantService as TenantService,
} from '~/services/services';

type Constructor = {
  masterRepository: typeof MasterRepository;
  encryptService: typeof EncryptService;
  tokenService: typeof TokenService;
  tenantService: typeof TenantService;
};

class MasterService {
  #masterRepository: typeof MasterRepository;
  #encryptService: typeof EncryptService;
  #tokenService: typeof TokenService;
  #tenantService: typeof TenantService;

  constructor({
    masterRepository,
    encryptService,
    tokenService,
    tenantService,
  }: Constructor) {
    this.#masterRepository = masterRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#tenantService = tenantService;
  }

  async getAll(): Promise<TMaster[]> {
    const masters = await this.#masterRepository.getAll();

    return masters.map((m) => ({
      id: m.id,
      email: m.email,
    }));
  }

  async login(id: string): Promise<MasterSignUpResponseDto> {
    const { email } = (await this.#masterRepository.getById(
      id,
    )) as MasterEntity;
    return {
      user: {
        email,
        id,
      },
      token: this.#tokenService.create(id),
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpRequestDto): Promise<MasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );
    const master = MasterEntity.createNew({
      name,
      email,
    });
    const tenant = await this.#tenantService.create();

    const { id } = await this.#masterRepository.create({
      master,
      passwordSalt,
      passwordHash,
      tenantId: tenant.id,
    });

    return this.login(id);
  }
}

export { MasterService };
