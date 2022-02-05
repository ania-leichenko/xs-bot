import { Master as MasterM } from '~/data/models/models';
import { Master as MasterEntity } from '~/services/master/master.entity';
import { MASTER_PASSWORD_SALT_ROUNDS as salt } from '~/common/constants/master.constants';
import { encrypt } from '~/helpers/crypt/encrypt/encrypt.helper';

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

  async getByFilter(filter: {
    string: string;
  }): Promise<MasterEntity | undefined> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ filter })
      .first();
    if (!master) {
      return;
    }

    return Master.modelToEntity(master);
  }

  async create(password: string, master: MasterEntity): Promise<void> {
    return this.#MasterModel
      .query()
      .insert({
        id: master.id,
        email: master.email,
        name: master.name,
        passwordHash: await encrypt(password),
        passwordSalt: salt,
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

export { Master };
