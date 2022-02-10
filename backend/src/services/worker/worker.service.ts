import { worker as workerRep } from '~/data/repositories/repositories';
import {
  WorkerCreateRequestDto,
  WorkerResponseDto,
} from '~/common/types/types';
import { Worker as WorkerEntity } from './worker.entity';
import { getRandomId as getRandomName } from '../../../../shared/build';
import {
  encrypt as encryptServ,
  tenant as tenantServ,
} from '~/services/services';

type Constructor = {
  workerRepository: typeof workerRep;
  tenantService: typeof tenantServ;
  encryptService: typeof encryptServ;
};

class Worker {
  #workerRepository: typeof workerRep;
  #tenantService: typeof tenantServ;
  #encryptService: typeof encryptServ;

  constructor({
    workerRepository,
    encryptService,
    tenantService,
  }: Constructor) {
    this.#workerRepository = workerRepository;
    this.#tenantService = tenantService;
    this.#encryptService = encryptService;
  }

  public async create({
    name,
    password,
  }: WorkerCreateRequestDto): Promise<WorkerResponseDto> {
    const tenant = await this.#tenantService.create(getRandomName());
    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    return WorkerEntity.createNew({
      name,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      tenantId: tenant.id,
    });
  }
}

export { Worker };
