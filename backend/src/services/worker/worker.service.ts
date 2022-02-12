import { worker as workerRep } from '~/data/repositories/repositories';
import { EAMWorkerGetAllResponseDto } from '~/common/types/types';

type Constructor = {
  workerRepository: typeof workerRep;
};

class Worker {
  #workerRepository: typeof workerRep;

  constructor({ workerRepository }: Constructor) {
    this.#workerRepository = workerRepository;
  }

  async getAll(): Promise<EAMWorkerGetAllResponseDto> {
    const workers = await this.#workerRepository.getAll();

    return workers.map((m) => ({
      id: m.id,
      name: m.name,
      createdAt: m.createdAt,
      tenantId: m.tenantId,
    }));
  }
}

export { Worker };
