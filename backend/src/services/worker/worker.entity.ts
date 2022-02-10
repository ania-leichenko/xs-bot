import { getRandomId } from '~/helpers/helpers';

class Worker {
  public id: string;
  public name: string;
  public passwordHash: string;
  public passwordSalt: string;
  public tenantId: string;
  public createdAt: Date;

  private constructor({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.tenantId = tenantId;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    createdAt: Date;
  }): Worker {
    return new Worker({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      createdAt,
    });
  }
  public static createNew({
    name,
    passwordHash,
    passwordSalt,
    tenantId,
  }: {
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
  }): Worker {
    return new Worker({
      id: getRandomId(),
      name,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
      tenantId,
    });
  }
}

export { Worker };
