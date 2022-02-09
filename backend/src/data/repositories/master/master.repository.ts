import { Master as MasterM } from '~/data/models/models';
import { Master as MasterEntity } from '~/services/master/master.entity';

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

  async getByEmail(email: string): Promise<MasterEntity | null> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ email })
      .first();
    if (!master) {
      return null;
    }

    return MasterRepository.modelToEntity(master);
  }

  async getById(id: string): Promise<MasterEntity | null> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ id })
      .first();
    if (!master) {
      return null;
    }

    return MasterRepository.modelToEntity(master);
  }

  async create({
    master,
    passwordHash,
    passwordSalt,
    tenantId,
  }: {
    master: MasterEntity;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
  }): Promise<MasterM> {
    return this.#MasterModel.query().insert({
      id: master.id,
      email: master.email,
      name: master.name,
      passwordHash,
      passwordSalt,
      createdAt: master.createdAt.toISOString(),
      tenantId,
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

export { MasterRepository };
