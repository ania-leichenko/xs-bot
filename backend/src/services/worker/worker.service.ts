import { worker as workerRep } from '~/data/repositories/repositories';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerResponseDto,
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
  }: EAMWorkerCreateRequestDto): Promise<EAMWorkerResponseDto> {
    const tenant = await this.#tenantService.create(getRandomName());
    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const worker = WorkerEntity.createNew({
      name,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      tenantId: tenant.id,
    });

    await this.#workerRepository.create(worker);

    return worker;
  }
}

export { Worker };
