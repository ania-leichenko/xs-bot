import { v4 as uuidv4 } from 'uuid';

class MasterEntity {
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
  }): MasterEntity {
    return new MasterEntity({
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
  }): MasterEntity {
    return new MasterEntity({
      id: uuidv4(),
      name,
      email,
      createdAt: new Date(),
    });
  }
}

export { MasterEntity };
