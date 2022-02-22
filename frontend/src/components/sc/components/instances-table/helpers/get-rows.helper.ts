import { InstancesTableAccessor } from 'common/enums/enums';
import { SCInstanceGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [InstancesTableAccessor.NAME]: string;
  [InstancesTableAccessor.INSTANCE_TYPE]: string;
  [InstancesTableAccessor.CREATED_AT]: string;
};

const getRows = (instances: SCInstanceGetByTenantResponseItemDto[]): Row[] => {
  return instances.map((item) => {
    const { name, createdAt, instanceType } = item;

    return {
      [InstancesTableAccessor.NAME]: name,
      [InstancesTableAccessor.INSTANCE_TYPE]: instanceType,
      [InstancesTableAccessor.CREATED_AT]: getDistanceToDateNow(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };
