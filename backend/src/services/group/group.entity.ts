import { getRandomId } from '~/helpers/helpers';

class Group {
  public id: string;
  public name: string;
  public createdAt: string;
  public tenantId: string;
  public workersIds: string[];
  public permissionIds: string[];

  private constructor({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
    permissionIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
    permissionIds: string[];
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
    this.workersIds = workersIds;
    this.permissionIds = permissionIds;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
    permissionIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
    permissionIds: string[];
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenantId,
      workersIds,
      permissionIds,
    });
  }

  public static createNew({
    name,
    tenantId,
    workersIds,
    permissionIds,
  }: {
    name: string;
    tenantId: string;
    workersIds: string[];
    permissionIds: string[];
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date().toISOString(),
      tenantId,
      workersIds,
      permissionIds,
    });
  }
}

export { Group };
