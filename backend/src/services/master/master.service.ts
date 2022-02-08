import {
  MasterDto as TMaster,
  MasterSignUpRequestDto,
  MasterSignUpResponseDto,
  MasterSignInDto,
} from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import {
  InvalidCredentialsError,
  InvalidCredentialsErrorException,
} from '~/exceptions/exceptions';
import { ExceptionMessage } from '~/common/enums/enums';
import {
  token as tokenServ,
  encrypt as encryptServ,
} from '~/services/services';
import { JwtPayload } from 'jsonwebtoken';

type Constructor = {
  masterRepository: typeof masterRep;
  encrypt: typeof encryptServ;
  token: typeof tokenServ;
};

class Master {
  #masterRepository: typeof masterRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;

  constructor({ masterRepository, encrypt, token }: Constructor) {
    this.#masterRepository = masterRepository;
    this.#encryptService = encrypt;
    this.#tokenService = token;
  }

  async getAll(): Promise<TMaster[]> {
    const masters = await this.#masterRepository.getAll();

    return masters.map((m) => ({
      id: m.id,
      email: m.email,
    }));
  }

  async login(id: string): Promise<MasterSignUpResponseDto> {
    const { email } = (await this.#masterRepository.getById(
      id,
    )) as MasterEntity;
    return {
      user: {
        email,
        id,
      },
      token: this.#tokenService.create(id),
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpRequestDto): Promise<MasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );
    const master = MasterEntity.createNew({
      name,
      email,
      password,
    });
    const { id } = await this.#masterRepository.create({
      master,
      passwordSalt,
      passwordHash,
    });

    return this.login(id);
  }

  async verifyLoginCredentials(
    verifyMasterDto: MasterSignInDto,
  ): Promise<MasterEntity> {
    const user = await this.#masterRepository.getByEmail(verifyMasterDto.email);

    if (!user) {
      throw new InvalidCredentialsErrorException(
        ExceptionMessage.INCORRECT_EMAIL,
      );
    }

    const isEqualPassword = await this.#encryptService.cryptCompare(
      verifyMasterDto.password,
      user.password,
    );
    if (!isEqualPassword) {
      throw new InvalidCredentialsErrorException(
        ExceptionMessage.PASSWORDS_NOT_MATCH,
      );
    }

    return user;
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    return tokenServ.verify(token);
  }
}

export { Master };
