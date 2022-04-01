import { getRandomId } from '~/helpers/helpers';
import { InstanceState } from '~/common/enums/enums';
import { OperationSystem } from '~/common/types/types';

class Instance {
  public id: string;
  public name: string;
  public createdAt: string;
  public keyPairId: string;
  public username: string;
  public hostname: string | null;
  public operationSystemId: string;
  public createdBy: string;
  public awsInstanceId: string;
  public tenantId: string;
  public state: InstanceState;
  public operationSystem: OperationSystem;

  private constructor({
    id,
    name,
    createdAt,
    keyPairId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    state,
    operationSystem,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairId: string;
    username: string;
    hostname: string | null;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    state: InstanceState;
    operationSystem: OperationSystem;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.keyPairId = keyPairId;
    this.username = username;
    this.hostname = hostname;
    this.operationSystemId = operationSystemId;
    this.createdBy = createdBy;
    this.awsInstanceId = awsInstanceId;
    this.tenantId = tenantId;
    this.state = state;
    this.operationSystem = operationSystem;
  }

  public static initialize({
    id,
    name,
    createdAt,
    keyPairId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    state,
    operationSystem,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairId: string;
    username: string;
    hostname: string | null;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    state: InstanceState;
    operationSystem: OperationSystem;
  }): Instance {
    return new Instance({
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
      operationSystem,
    });
  }

  public static createNew({
    name,
    keyPairId,
    username,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    operationSystem,
  }: {
    name: string;
    keyPairId: string;
    username: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    operationSystem: OperationSystem;
  }): Instance {
    return new Instance({
      id: getRandomId(),
      name,
      keyPairId,
      createdAt: new Date().toISOString(),
      username,
      hostname: null,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state: InstanceState.CREATING,
      operationSystem,
    });
  }
}

export { Instance };
