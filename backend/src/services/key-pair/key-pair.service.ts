import { keyPair as KeyPairRep } from '~/data/repositories/repositories';
import { KeyPair as KeyPairEntity } from '../key-pair/key-pair.entity';
import { ec2 as AWSEc2Serv } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  keyPairRepository: typeof KeyPairRep;
  awsEc2Service: typeof AWSEc2Serv;
};

class KeyPair {
  #keyPairRepository: typeof KeyPairRep;
  #awsEc2Service: typeof AWSEc2Serv;

  constructor({ keyPairRepository, awsEc2Service }: Constructor) {
    this.#keyPairRepository = keyPairRepository;
    this.#awsEc2Service = awsEc2Service;
  }

  public async create(): Promise<string> {
    const name = getRandomId();
    const keyPairData = await this.#awsEc2Service.createKeyPair(name);
    const keyPair = KeyPairEntity.createNew({
      id: keyPairData.name as string,
      sshPemFileContent: keyPairData.keyMaterial as string,
    });
    const { id } = await this.#keyPairRepository.create(keyPair);

    return id;
  }
}

export { KeyPair };
