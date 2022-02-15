import { getRandomId } from '~/helpers/helpers';
import { EAMGroupRelatedItem } from '~/common/types/types';

class Group {
  public id: string;
  public name: string;
  public createdAt: string;
  public tenantId: string;
  public users?: EAMGroupRelatedItem[];
  public permissions?: EAMGroupRelatedItem[];

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
    createdAt: string;
    tenantId: string;
    users?: EAMGroupRelatedItem[];
    permissions?: EAMGroupRelatedItem[];
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
    createdAt: string;
    tenantId: string;
    users: EAMGroupRelatedItem[];
    permissions: EAMGroupRelatedItem[];
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
      createdAt: new Date().toISOString(),
      tenantId,
    });
  }
}

export { Group };
