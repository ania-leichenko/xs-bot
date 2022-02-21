import {
  SLCFunctionCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slcFunction as slcFunctionRep } from '~/data/repositories/repositories';
import { SLCFunction as SLCFunctionEntity } from './slc-function.entity';
import { InvalidSLCFunctionError } from '~/exceptions/exceptions';
import {
  HttpCode,
  ExceptionMessage,
  UserRole,
  LambdaDefaultParam,
} from '~/common/enums/enums';
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
    createdBy,
    token,
  }: {
    name: string;
    createdBy: string;
    token: string;
  }): Promise<SLCFunctionCreateResponseDto> {
    const { userRole } = this.#tokenService.decode<TokenPayload>(token);

    if (userRole !== UserRole.WORKER) {
      throw new InvalidSLCFunctionError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_FUNCTION_CREATE,
      });
    }

    const functionByName = await this.#slcFunctionRepository.getByName(
      createdBy,
      name,
    );

    if (functionByName) {
      throw new InvalidSLCFunctionError();
    }

    const sourceCode = LambdaDefaultParam.SOURCE_CODE as string;

    const { FunctionArn } = await this.#lambdaService.creteFunction({
      name,
      sourceCode,
    });

    if (!FunctionArn) {
      throw new InvalidSLCFunctionError({
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
