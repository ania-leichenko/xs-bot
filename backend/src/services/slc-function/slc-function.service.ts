import {
  SLCFunctionCreateResponseDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionGetResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slcFunction as slcFunctionRep } from '~/data/repositories/repositories';
import { SLCFunction as SLCFunctionEntity } from './slc-function.entity';
import { SLCError } from '~/exceptions/exceptions';
import {
  HttpCode,
  ExceptionMessage,
  UserRole,
  LambdaDefaultParam,
} from '~/common/enums/enums';
import {
  worker as workerServ,
  token as tokenServ,
  lambda as lambdaServ,
} from '~/services/services';

type Constructor = {
  slcFunctionRepository: typeof slcFunctionRep;
  workerService: typeof workerServ;
  tokenService: typeof tokenServ;
  lambdaService: typeof lambdaServ;
};

class SLCFunction {
  #slcFunctionRepository: typeof slcFunctionRep;
  #workerService: typeof workerServ;
  #tokenService: typeof tokenServ;
  #lambdaService: typeof lambdaServ;

  constructor({
    slcFunctionRepository,
    workerService,
    tokenService,
    lambdaService,
  }: Constructor) {
    this.#slcFunctionRepository = slcFunctionRepository;
    this.#workerService = workerService;
    this.#tokenService = tokenService;
    this.#lambdaService = lambdaService;
  }

  public async create({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<SLCFunctionCreateResponseDto> {
    const { userId: createdBy, userRole } =
      this.#tokenService.decode<TokenPayload>(token);

    if (userRole !== UserRole.WORKER) {
      throw new SLCError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_FUNCTION_CREATE,
      });
    }

    const slcFunctionByName = await this.#slcFunctionRepository.getByName(name);

    if (slcFunctionByName) {
      throw new SLCError();
    }

    const sourceCode = LambdaDefaultParam.SOURCE_CODE;

    const { FunctionArn } = await this.#lambdaService.createFunction({
      name,
      sourceCode,
    });

    if (!FunctionArn) {
      throw new SLCError({
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

  public async getSLCFunctionsByTenant({
    query,
    token,
  }: {
    query: SLCFunctionGetRequestParamsDto;
    token: string;
  }): Promise<SLCFunctionGetResponseDto> {
    const { from, count } = query;
    const { tenantId } = await this.#tokenService.decode(token);

    const filter = {
      from,
      count,
      tenantId,
    };

    const slcFunctions = await this.#slcFunctionRepository.getAllByTenant(
      filter,
    );

    return { items: slcFunctions };
  }

  public async delete({
    id,
    token,
  }: {
    id: string;
    token: string;
  }): Promise<void> {
    const { userRole } = this.#tokenService.decode<TokenPayload>(token);

    if (userRole !== UserRole.WORKER) {
      throw new SLCError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_FUNCTION_DELETE,
      });
    }

    const { name } = await this.#slcFunctionRepository.getById(id);

    await this.#lambdaService.deleteFunction(name);

    await this.#slcFunctionRepository.delete(id);
  }
}

export { SLCFunction };
