import { getRandomId } from '~/helpers/helpers';

class Group {
  public id: string;
  public name: string;
  public createdAt: string;
  public tenantId: string;
  public workersIds: string[];

  private constructor({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
    this.workersIds = workersIds;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenantId,
      workersIds,
    });
  }

  public static createNew({
    name,
    tenantId,
    workersIds,
  }: {
    name: string;
    tenantId: string;
    workersIds: string[];
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date().toISOString(),
      tenantId,
      workersIds,
    });
  }
}

export { Group };
