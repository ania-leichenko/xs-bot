import { BSObject as BSObjectM } from '~/data/models/models';
import { BSObject as BSObjectEntity } from '~/services/bs-object/bs-object.entity';
import { TableName } from '~/common/enums/db/table-name.enum';

type Constructor = {
  BSObjectModel: typeof BSObjectM;
};

class BSObject {
  #BSObjectModel: typeof BSObjectM;

  constructor({ BSObjectModel }: Constructor) {
    this.#BSObjectModel = BSObjectModel;
  }

  async create(bsObject: BSObjectEntity): Promise<BSObjectEntity> {
    const { id, name, sizeInBytes, spaceId, uploadedBy, awsObjectKey } =
      bsObject;

    const model = await this.#BSObjectModel.query().insert({
      id,
      name,
      sizeInBytes,
      createdAt: bsObject.createdAt.toISOString(),
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
    return BSObject.modelToEntity(model);
  }

  async getById(id: string): Promise<BSObjectEntity | null> {
    const object = await this.#BSObjectModel
      .query()
      .select()
      .where({ id })
      .first();
    return object ? BSObject.modelToEntity(object) : null;
  }

  async getObjects(filter: {
    spaceId: string;
    from: number;
    count: number;
    tenantId: string;
  }): Promise<BSObjectEntity[]> {
    const { from: offset, count: limit, spaceId, tenantId } = filter;

    const objects = await this.#BSObjectModel
      .query()
      .select(
        `${TableName.OBJECTS}.id`,
        `${TableName.OBJECTS}.name`,
        `${TableName.OBJECTS}.createdAt`,
        'sizeInBytes',
      )
      .join(TableName.WORKERS, 'uploadedBy', '=', `${TableName.WORKERS}.id`)
      .where({ tenantId })
      .andWhere({ spaceId })
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset);
    const result: BSObjectEntity[] = [];
    objects.forEach((object) => result.push(BSObject.modelToEntity(object)));
    return result;
  }

  public static modelToEntity(model: BSObjectM): BSObjectEntity {
    const { id, name, sizeInBytes, spaceId, uploadedBy, awsObjectKey } = model;

    return BSObjectEntity.initialize({
      id,
      name,
      sizeInBytes,
      createdAt: new Date(model.createdAt),
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
  }
}

export { BSObject };
