import {
  worker as workerRep,
  tenant as tenantRep,
} from '~/data/repositories/repositories';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerSignInResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  TokenPayload,
} from '~/common/types/types';
import { Worker as WorkerEntity } from './worker.entity';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import {
  encrypt as encryptServ,
  master as masterServ,
  token as tokenServ,
} from '~/services/services';
import { InvalidCredentialsError, EAMError } from '~/exceptions/exceptions';

type Constructor = {
  workerRepository: typeof workerRep;
  tenantRepository: typeof tenantRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
  masterService: typeof masterServ;
};

class Worker {
  #workerRepository: typeof workerRep;
  #tenantRepository: typeof tenantRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;
  #masterService: typeof masterServ;

  constructor({
    workerRepository,
    tenantRepository,
    encryptService,
    tokenService,
    masterService,
  }: Constructor) {
    this.#workerRepository = workerRepository;
    this.#tenantRepository = tenantRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#masterService = masterService;
  }

  public async login(id: string): Promise<EAMWorkerSignInResponseDto> {
    const { name, tenantId, permissions } =
      (await this.#workerRepository.getById(id)) as WorkerEntity;
    return {
      user: {
        id,
        name,
        tenantId,
        permissions,
      },
      token: this.#tokenService.create({
        userId: id,
        userRole: UserRole.WORKER,
        tenantId,
      }),
    };
  }

  public async getUserById(
    userId: string,
  ): Promise<EAMWorkerSignInResponseDto> {
    return this.login(userId);
  }

  public async create({
    name,
    password,
    token,
    groupIds,
  }: EAMWorkerCreateRequestDto): Promise<EAMWorkerCreateResponseDto> {
    const { tenantId } = this.#tokenService.decode<TokenPayload>(token);

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const workerByName = await this.#workerRepository.getByName(name, tenantId);

    if (workerByName) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.WORKER_NAME_EXISTS,
      });
    }

    const worker = WorkerEntity.createNew({
      name,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      tenantId,
      permissions: [],
      groupIds,
    });

    const hasGroups = Boolean(worker.groupIds.length);

    if (!hasGroups) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.GROUP_NOT_SELECTED,
      });
    }
    return await this.#workerRepository.create(worker);
  }

  public async verifyLoginCredentials(
    verifyWorkerDto: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    const { tenantName, workerName, password } = verifyWorkerDto;

    const tenant = await this.#tenantRepository.getByName(tenantName);

    if (!tenant) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_TENANT_NAME,
      });
    }

    const worker = await this.#workerRepository.getByName(
      workerName,
      tenant.id,
    );

    if (!worker) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_WORKER_NAME,
      });
    }

    const isEqualPassword = await this.#encryptService.compare(
      password,
      worker.passwordSalt,
      worker.passwordHash,
    );

    if (!isEqualPassword) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return this.login(worker.id);
  }

  async getAll(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllResponseDto> {
    const workers = await this.#workerRepository.getAll(param);
    const countItems = await this.#workerRepository.getCount(param);
    return { items: workers, countItems };
  }

  public async deleteWorker(id: string): Promise<void> {
    const worker = await this.#workerRepository.getById(id);

    if (!worker) {
      throw new EAMError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.WORKER_NOT_FOUND,
      });
    }

    const master = await this.#masterService.getMasterById(id);

    if (master) {
      throw new EAMError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_DELETE,
      });
    }

    await this.#workerRepository.deleteWorker(id);
  }
}

export { Worker };
