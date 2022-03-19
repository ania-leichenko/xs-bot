import { InstanceState } from '~/common/enums/enums';

type SCInstanceGetByTenantResponseItemDto = {
  name: string;
  id: string;
  awsInstanceId: string;
  instanceType: string;
  createdAt: string;
  publicIpAddress: string | null;
  keyPairId: string;
  state: InstanceState;
};

export { type SCInstanceGetByTenantResponseItemDto };
