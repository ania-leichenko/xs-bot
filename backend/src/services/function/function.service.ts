import {
  SLCFunctionCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slcFunction as slcFunctionRep } from '~/data/repositories/repositories';
import { SLCFunction as SLCFunctionEntity } from './function.entity';
import { InvalidFunctionError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import { token as tokenServ, lambda as lambdaServ } from '~/services/services';

type Constructor = {
  slcFunctionRepository: typeof slcFunctionRep;
  tokenService: typeof tokenServ;
  lambdaService: typeof lambdaServ;
};

class SLCFunction {
  #slcFunctionRepository: typeof slcFunctionRep;
  #tokenService: typeof tokenServ;
  #lambdaService: typeof lambdaServ;

  constructor({
    slcFunctionRepository,
    tokenService,
    lambdaService,
  }: Constructor) {
    this.#slcFunctionRepository = slcFunctionRepository;
    this.#tokenService = tokenService;
    this.#lambdaService = lambdaService;
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

    const { FunctionArn } = await this.#lambdaService.creteFunction({
      name,
      sourceCode,
    });

    if (!FunctionArn) {
      throw new InvalidFunctionError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.FUNCTION_NOT_CREATED,
      });
    }

    const slcFunction = SLCFunctionEntity.createNew({
      name,
      sourceCode,
      createdBy,
      awsLambdaId: FunctionArn,
    });

    await this.#slcFunctionRepository.create(slcFunction);

    return { name: slcFunction.name };
  }
}

export { SLCFunction };
