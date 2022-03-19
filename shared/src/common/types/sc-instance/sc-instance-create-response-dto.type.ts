import { InstanceState } from '~/common/enums/enums';

type SCInstanceCreateResponseDto = {
  name: string;
  id: string;
  awsInstanceId: string;
  instanceType: string;
  createdAt: string;
  publicIpAddress: null;
  keyPairId: string;
  state: InstanceState;
};

export { type SCInstanceCreateResponseDto };
