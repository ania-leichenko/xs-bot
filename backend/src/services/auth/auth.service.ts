import { UserRole } from 'bws-shared';
import {
  EAMMasterSignInRequestDto,
  EAMMasterSignInResponseDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerSignInResponseDto,
  TokenPayload,
} from '~/common/types/types';
import {
  master as masterServ,
  worker as workerServ,
  token as tokenServ,
} from '~/services/services';

type Constructor = {
  masterService: typeof masterServ;
  workerService: typeof workerServ;
  tokenService: typeof tokenServ;
};

class Auth {
  #masterService: typeof masterServ;
  #workerService: typeof workerServ;
  #tokenService: typeof tokenServ;

  constructor({ masterService, workerService, tokenService }: Constructor) {
    this.#masterService = masterService;
    this.#workerService = workerService;
    this.#tokenService = tokenService;
  }

  public async getMaster(
    masterDto: EAMMasterSignInRequestDto,
  ): Promise<EAMMasterSignInResponseDto> {
    return this.#masterService.verifyLoginCredentials(masterDto);
  }

  public async getWorker(
    workerDto: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    return this.#workerService.verifyLoginCredentials(workerDto);
  }

  public async getCurrentUser(
    token: string,
  ): Promise<null | EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto> {
    const { userId, userRole } = this.#tokenService.decode<TokenPayload>(token);

    switch (userRole) {
      case UserRole.master:
        return this.#masterService.getCurrentUser(userId);
      case UserRole.worker:
        return this.#workerService.getCurrentUser(userId);
      default:
        return null;
    }
  }
}

export { Auth };
