import { MasterModel as MasterM } from '~/data/models/models';
import { MasterEntity } from '~/services/master/master.entity';

type Constructor = {
  MasterModel: typeof MasterM;
};

class MasterRepository {
  #MasterModel: typeof MasterM;

  constructor({ MasterModel }: Constructor) {
    this.#MasterModel = MasterModel;
  }

  async getAll(): Promise<MasterEntity[]> {
    const masters = await this.#MasterModel.query();
    return masters.map(MasterRepository.modelToEntity);
  }

  create(master: MasterEntity): Promise<void> {
    return this.#MasterModel
      .query()
      .insert({
        id: master.id,
        email: master.email,
        name: master.name,
        password_hash: '', //TODO: replace by actual values
        password_salt: '',
        createdAt: master.createdAt.toISOString(),
      })
      .then();
  }

  public static modelToEntity(model: MasterM): MasterEntity {
    return MasterEntity.initialize({
      id: model.id,
      name: model.name,
      email: model.email,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { MasterRepository };
