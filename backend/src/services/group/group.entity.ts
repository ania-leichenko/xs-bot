import { getRandomId } from '~/helpers/helpers';

class Group {
  public id: string;
  public name: string;
  public createdAt: Date;
  public tenant_id: string;

  private constructor({
    id,
    name,
    createdAt,
    tenant_id,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenant_id: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenant_id = tenant_id;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenant_id,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenant_id: string;
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenant_id,
    });
  }

  public static createNew({
    name,
    tenant_id,
  }: {
    name: string;
    tenant_id: string;
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date(),
      tenant_id,
    });
  }
}

export { Group };
