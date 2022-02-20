import { Space as SpaceM } from '~/data/models/space/space.model';
import { Space as SpaceEntity } from '~/services/space/space.entity';

type Constructor = {
  SpaceModel: typeof SpaceM;
};

class Space {
  #SpaceModel: typeof SpaceM;

  constructor({ SpaceModel }: Constructor) {
    this.#SpaceModel = SpaceModel;
  }

  async create(space: SpaceEntity): Promise<SpaceEntity> {
    const { id, name, createdAt, createdBy, awsS3Id } = space;

    const created = await this.#SpaceModel.query().insert({
      id,
      name,
      createdAt,
      createdBy,
      awsS3Id,
    });

    return Space.modelToEntity(created);
  }

  public static modelToEntity(model: SpaceM): SpaceEntity {
    return SpaceEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      createdBy: model.createdBy,
      awsS3Id: model.awsS3Id,
    });
  }
}

export { Space };
