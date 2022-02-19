import { getRandomId } from '~/helpers/helpers';

class Instance {
  public id: string;
  public name: string;
  public createdAt: string;
  public keyPairsId: string;
  public username: string;
  public hostname: string;
  public operationSystemId: string;
  public createdBy: string;
  public awsInstanceId: string;

  private constructor({
    id,
    name,
    createdAt,
    keyPairsId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairsId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.keyPairsId = keyPairsId;
    this.username = username;
    this.hostname = hostname;
    this.operationSystemId = operationSystemId;
    this.createdBy = createdBy;
    this.awsInstanceId = awsInstanceId;
  }

  public static initialize({
    id,
    name,
    createdAt,
    keyPairsId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairsId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
  }): Instance {
    return new Instance({
      id,
      name,
      createdAt,
      keyPairsId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
    });
  }

  public static createNew({
    name,
    keyPairsId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
  }: {
    name: string;
    keyPairsId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
  }): Instance {
    return new Instance({
      id: getRandomId(),
      name,
      keyPairsId,
      createdAt: new Date().toISOString(),
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
    });
  }
}

export { Instance };
