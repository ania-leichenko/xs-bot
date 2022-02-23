import { getRandomId } from '~/helpers/helpers';

class Worker {
  public id: string;
  public name: string;
  public passwordHash: string;
  public passwordSalt: string;
  public tenantId: string;
  public groupIds: string[];
  public permissions: string[];
  public createdAt: Date;

  private constructor({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    groupIds,
    permissions,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    groupIds: string[];
    permissions: string[];
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.tenantId = tenantId;
    this.groupIds = groupIds;
    this.permissions = permissions;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    groupIds,
    permissions,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    groupIds: string[];
    permissions: string[];
    createdAt: Date;
  }): Worker {
    return new Worker({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      permissions,
      createdAt,
    });
  }
  public static createNew({
    name,
    passwordHash,
    passwordSalt,
    groupIds,
    permissions,
    tenantId,
  }: {
    name: string;
    passwordHash: string;
    passwordSalt: string;
    groupIds: string[];
    permissions: string[];
    tenantId: string;
  }): Worker {
    return new Worker({
      id: getRandomId(),
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      permissions,
      createdAt: new Date(),
    });
  }
}

export { Worker };
