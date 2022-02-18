import { space as spaceRep } from '~/data/repositories/repositories';
import { TokenPayload } from '~/common/types/types';
import { UserRole } from '~/common/enums/enums';
import { token as tokenServ, s3 as s3Serv } from '~/services/services';
import { CreateBucketOutput } from '@aws-sdk/client-s3';

type Constructor = {
  spaceRepository: typeof spaceRep;
  tokenService: typeof tokenServ;
  s3Service: typeof s3Serv;
};

class Space {
  #spaceRepository: typeof spaceRep;
  #tokenService: typeof tokenServ;
  #s3Service: typeof s3Serv;

  constructor({ spaceRepository, tokenService, s3Service }: Constructor) {
    this.#spaceRepository = spaceRepository;
    this.#tokenService = tokenService;
    this.#s3Service = s3Service;
  }

  public async create({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<CreateBucketOutput> {
    const user: TokenPayload = await tokenServ.decode(token);

    if (user.userRole === UserRole.MASTER) {
      throw new Error('Master is not able to crete space');
    }

    return await s3Serv.creteBucket({ name });
  }
}

export { Space };
