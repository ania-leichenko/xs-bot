import {
  SCOperationSystemGetAllItemResponseDto,
  Option,
} from 'common/types/types';
const getOperationSystemOptions = (
  operationSystems: SCOperationSystemGetAllItemResponseDto[],
): Option[] => {
  return operationSystems.map(({ id, name }) => ({
    value: id,
    label: name.split('-').join(' '),
  }));
};

export { getOperationSystemOptions };
