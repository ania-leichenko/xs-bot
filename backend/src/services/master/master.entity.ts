import { getRandomId } from '~/helpers/helpers';

class Master {
  public id: string;
  public name: string;
  public email: string;
  public createdAt: Date;

  private constructor({
    id,
    name,
    email,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    email,
    createdAt,
  }: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  }): Master {
    return new Master({
      id,
      name,
      email,
      createdAt,
    });
  }

  public static createNew({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): Master {
    return new Master({
      id: getRandomId(),
      name,
      email,
      createdAt: new Date(),
    });
  }
}

export { Master };
