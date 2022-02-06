import { Master as MasterM } from '~/data/models/models';
import { Master as MasterEntity } from '~/services/master/master.entity';

type Constructor = {
  MasterModel: typeof MasterM;
};

class Master {
  #MasterModel: typeof MasterM;

  constructor({ MasterModel }: Constructor) {
    this.#MasterModel = MasterModel;
  }

  async getAll(): Promise<MasterEntity[]> {
    const masters = await this.#MasterModel.query();
    return masters.map(Master.modelToEntity);
  }

  async getByEmail(email: string): Promise<MasterEntity | undefined> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ email })
      .first();
    if (!master) {
      return;
    }

    return Master.modelToEntity(master);
  }

  async getById(id: string): Promise<MasterEntity | undefined> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ id })
      .first();
    if (!master) {
      return;
    }

    return Master.modelToEntity(master);
  }

  async create(
    passwordSalt: string,
    passwordHash: string,
    master: MasterEntity,
  ): Promise<MasterM> {
    return this.#MasterModel.query().insert({
      id: master.id,
      email: master.email,
      name: master.name,
      passwordHash,
      passwordSalt,
      createdAt: master.createdAt.toISOString(),
    });
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

export { Master };
