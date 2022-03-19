import { InstanceState } from '~/common/enums/enums';

type SCInstanceUpdateResponseDto = {
  name: string;
  id: string;
  awsInstanceId: string;
  instanceType: string;
  createdAt: string;
  publicIpAddress: string | null;
  keyPairId: string;
  state: InstanceState;
};

export { type SCInstanceUpdateResponseDto };
