import {
  MasterDto as TMaster,
  MasterSignUpRequestDto,
  MasterSignUpResponseDto,
} from '~/common/types/types';
import { master as MasterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  token as TokenServ,
  encrypt as EncryptServ,
  tenant as TenantServ,
} from '~/services/services';

type Constructor = {
  masterRepository: typeof MasterRep;
  encryptService: typeof EncryptServ;
  tokenService: typeof TokenServ;
  tenantService: typeof TenantServ;
};

class Master {
  #masterRepository: typeof MasterRep;
  #encryptService: typeof EncryptServ;
  #tokenService: typeof TokenServ;
  #tenantService: typeof TenantServ;

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

export { Master };
