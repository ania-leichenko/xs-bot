import { getRandomId } from '~/helpers/helpers';

class Master {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;

  private constructor({
    id,
    name,
    email,
    password,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    email,
    password,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }): Master {
    return new Master({
      id,
      name,
      email,
      password,
      createdAt,
    });
  }

  public static createNew({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Master {
    return new Master({
      id: getRandomId(),
      name,
      email,
      password,
      createdAt: new Date(),
    });
  }
}

export { Master };
