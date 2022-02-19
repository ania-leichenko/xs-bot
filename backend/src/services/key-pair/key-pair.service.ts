import { keyPair as KeyPairRep } from '~/data/repositories/repositories';
import { KeyPair as KeyPairEntity } from '../key-pair/key-pair.entity';
import { ec2 as EC2Serv, encrypt as EncryptServ } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  keyPairRepository: typeof KeyPairRep;
  ec2Service: typeof EC2Serv;
  encryptService: typeof EncryptServ;
};

class KeyPair {
  #keyPairRepository: typeof KeyPairRep;
  #ec2Service: typeof EC2Serv;
  #encryptService: typeof EncryptServ;

  constructor({ keyPairRepository, ec2Service, encryptService }: Constructor) {
    this.#keyPairRepository = keyPairRepository;
    this.#ec2Service = ec2Service;
    this.#encryptService = encryptService;
  }

  public async create(): Promise<string> {
    const name = getRandomId();
    const keyPairData = await this.#ec2Service.createKeyPair(name);
    const salt = await this.#encryptService.createSalt();
    const sshPemFileContent = await this.#encryptService.createHash(
      keyPairData.name as string,
      salt,
    );
    const keyPair = KeyPairEntity.createNew({
      id: keyPairData.name as string,
      sshPemFileContent,
    });
    const { id } = await this.#keyPairRepository.create(keyPair);

    return id;
  }
}

export { KeyPair };
