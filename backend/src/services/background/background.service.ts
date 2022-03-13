import { instance as InstanceRep } from '~/data/repositories/repositories';
import { ec2 as EC2Serv, instance as instanceServ } from '~/services/services';
import { ENV } from '~/common/enums/enums';

type Constructor = {
  instanceService: typeof instanceServ;
  instanceRepository: typeof InstanceRep;
  ec2Service: typeof EC2Serv;
};

class Background {
  #instanceService: typeof instanceServ;
  #instanceRepository: typeof InstanceRep;
  #ec2Service: typeof EC2Serv;

  constructor({
    instanceService,
    instanceRepository,
    ec2Service,
  }: Constructor) {
    this.#instanceService = instanceService;
    this.#instanceRepository = instanceRepository;
    this.#ec2Service = ec2Service;
  }

  public async backgroundWork(): Promise<void> {
    const { FLAGS } = ENV;
    FLAGS.INSTANCE_AUTO_DELETING
      ? setInterval(async () => {
          const oldInstances = await this.#instanceRepository.getOldInstances();

          oldInstances.forEach((instance) => instanceServ.delete(instance.id));
        }, 60 * 60 * 1000)
      : null;
  }
}

export { Background };
