import { Chip } from 'components/common/common';
import { instanceStateToChipColor } from '../../helpers/helpers';
import { InstanceState } from 'common/enums/enums';

const StateCell = (state: InstanceState): JSX.Element => (
  <Chip chipColor={instanceStateToChipColor(state)}>{state}</Chip>
);

export { StateCell };
