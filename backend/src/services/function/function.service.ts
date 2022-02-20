import {
  SLCFunctionCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slcFunction as slcFunctionRep } from '~/data/repositories/repositories';
import { SLCFunction as SLCFunctionEntity } from './function.entity';
import { InvalidFunctionError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import { token as tokenServ } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  slcFunctionRepository: typeof slcFunctionRep;
  tokenService: typeof tokenServ;
};

class SLCFunction {
  #slcFunctionRepository: typeof slcFunctionRep;
  #tokenService: typeof tokenServ;

  constructor({ slcFunctionRepository, tokenService }: Constructor) {
    this.#slcFunctionRepository = slcFunctionRepository;
    this.#tokenService = tokenService;
  }

  public async create({
    name,
    sourceCode,
    createdBy,
    token,
  }: {
    name: string;
    sourceCode: string;
    createdBy: string;
    token: string;
  }): Promise<SLCFunctionCreateResponseDto> {
    const { userRole } = this.#tokenService.decode<TokenPayload>(token);

    if (userRole !== UserRole.WORKER) {
      throw new InvalidFunctionError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_FUNCTION_CREATE,
      });
    }

    const functionByName = await this.#slcFunctionRepository.getByName(
      createdBy,
      name,
    );

    if (functionByName) {
      throw new InvalidFunctionError();
    }

    const awsLambdaId = getRandomId();

    const slcFunction = SLCFunctionEntity.createNew({
      name,
      sourceCode,
      createdBy,
      awsLambdaId,
    });

    await this.#slcFunctionRepository.create(slcFunction);

    return { name: slcFunction.name };
  }
}

export { SLCFunction };
