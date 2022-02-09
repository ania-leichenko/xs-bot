import { getRandomId } from '~/helpers/helpers';

class Master {
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public passwordSalt: string;
  public createdAt: Date;
  public tenantId: string;

  private constructor({
    id,
    name,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    tenantId: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
  }

  public static initialize({
    id,
    name,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    tenantId: string;
  }): Master {
    return new Master({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt,
      tenantId,
    });
  }

  public static createNew({
    name,
    email,
    passwordHash,
    passwordSalt,
    tenantId,
  }: {
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
  }): Master {
    return new Master({
      id: getRandomId(),
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
      tenantId,
    });
  }
}

export { Master };
