import { operationSystem as OperationSystemRep } from '~/data/repositories/repositories';
import { OperationSystem as OperationSystemEntity } from '~/services/operation-system/operation-system.entity';
import { SCOperationSystemGetAllResponseDto } from '~/common/types/types';
import { SCError } from '~/exceptions/exceptions';
import { HttpCode, ExceptionMessage } from '~/common/enums/enums';

type Constructor = {
  operationSystemRepository: typeof OperationSystemRep;
};

class OperationSystem {
  #operationSystemRepository: typeof OperationSystemRep;

  constructor({ operationSystemRepository }: Constructor) {
    this.#operationSystemRepository = operationSystemRepository;
  }

  public async getOperationSystem(
    operationSystemId: string,
  ): Promise<OperationSystemEntity> {
    const operationSystem = await this.#operationSystemRepository.getById(
      operationSystemId,
    );
    if (!operationSystem) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.OPERATION_SYSTEM_NOT_FOUND,
      });
    }

    return operationSystem;
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
