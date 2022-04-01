import { InstanceState } from '~/common/enums/enums';
import { SCInstanceRelatedItem } from './sc-instance-related-item.type';

type SCInstanceUpdateResponseDto = {
  name: string;
  id: string;
  awsInstanceId: string;
  instanceType: string;
  createdAt: string;
  publicIpAddress: string | null;
  keyPairId: string;
  state: InstanceState;
  operationSystem: SCInstanceRelatedItem;
};

export { type SCInstanceUpdateResponseDto };
