import { getRandomId } from '~/helpers/helpers';

type Item = {
  id: string;
  name: string;
};

class Group {
  public id: string;
  public name: string;
  public createdAt: Date;
  public tenantId: string;
  public users?: Item[];
  public permissions?: Item[];

  private constructor({
    id,
    name,
    createdAt,
    tenantId,
    users,
    permissions,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenantId: string;
    users?: Item[];
    permissions?: Item[];
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
    this.users = users;
    this.permissions = permissions;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenantId,
    users,
    permissions,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenantId: string;
    users?: Item[];
    permissions?: Item[];
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenantId,
      users,
      permissions,
    });
  }

  public static createNew({
    name,
    tenantId,
  }: {
    name: string;
    tenantId: string;
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date(),
      tenantId,
    });
  }
}

export { Group };
