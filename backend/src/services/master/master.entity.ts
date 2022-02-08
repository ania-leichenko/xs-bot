import { getRandomId } from '~/helpers/helpers';

class Master {
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public passwordSalt: string;
  public createdAt: Date;

  private constructor({
    id,
    name,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
  }): Master {
    return new Master({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt,
    });
  }

  public static createNew({
    name,
    email,
    passwordHash,
    passwordSalt,
  }: {
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
  }): Master {
    return new Master({
      id: getRandomId(),
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
    });
  }
}

export { Master };
