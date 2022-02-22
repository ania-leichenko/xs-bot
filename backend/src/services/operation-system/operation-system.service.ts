import { operationSystem as OperationSystemRep } from '~/data/repositories/repositories';
import { OperationSystem as OperationSystemEntity } from '~/services/operation-system/operation-system.entity';
import { SCOperationSystemGetAllResponseDto } from '~/common/types/types';

type Constructor = {
  operationSystemRepository: typeof OperationSystemRep;
};

class OperationSystem {
  #operationSystemRepository: typeof OperationSystemRep;

  constructor({ operationSystemRepository }: Constructor) {
    this.#operationSystemRepository = operationSystemRepository;
  }

  public async getImageId(operationSystemId: string): Promise<string> {
    const operationSystem = await this.#operationSystemRepository.getById(
      operationSystemId,
    );
    return (operationSystem as OperationSystemEntity).awsGenerationName;
  }

  public async getAll(): Promise<SCOperationSystemGetAllResponseDto> {
    const operationSystems = await this.#operationSystemRepository.getAll();

    return {
      items: operationSystems.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    };
  }
}

export { OperationSystem };
