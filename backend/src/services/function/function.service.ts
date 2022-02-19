import {
  SLCFunctionCreateRequestDto,
  SLCFunctionCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slc as functionRep } from '~/data/repositories/repositories';
import { SLC as FunctionEntity } from './function.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import { token as tokenServ } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  functionRepository: typeof functionRep;
  tokenService: typeof tokenServ;
};

class Function {
  #functionRepository: typeof functionRep;
  #tokenService: typeof tokenServ;

  constructor({ functionRepository, tokenService }: Constructor) {
    this.#functionRepository = functionRepository;
    this.#tokenService = tokenService;
  }

  public async create({
    slc,
    token,
  }: {
    slc: SLCFunctionCreateRequestDto;
    token: string;
  }): Promise<SLCFunctionCreateResponseDto> {
    const { userRole } = this.#tokenService.decode<TokenPayload>(token);

    if (userRole !== UserRole.WORKER) {
      throw new InvalidCredentialsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_FUNCTION_CREATE,
      });
    }

    const functionByName = await this.#functionRepository.getByName(
      slc.createdBy,
      slc.name,
    );
    if (functionByName) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.FUNCTION_NAME_EXISTS,
      });
    }

    const awsLambdaId = getRandomId();

    const newFunction = FunctionEntity.createNew({
      ...slc,
      awsLambdaId,
    });

    const { name } = await this.#functionRepository.create(newFunction);

    return { name };
  }
}

export { Function };
