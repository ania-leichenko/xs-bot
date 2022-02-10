import { getRandomId } from '~/helpers/helpers';

class Worker {
  public id: string;
  public name: string;
  public passwordHash: string;
  public passwordSalt: string;
  public createdAt: Date;
  public tenantId: string;

  private constructor({
    id,
    name,
    passwordHash,
    passwordSalt,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    tenantId: string;
  }) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
  }

  public static initialize({
    id,
    name,
    passwordHash,
    passwordSalt,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    tenantId: string;
  }): Worker {
    return new Worker({
      id,
      name,
      passwordHash,
      passwordSalt,
      createdAt,
      tenantId,
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
