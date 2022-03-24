import { ChipColor, InstanceState } from 'common/enums/enums';

const instanceStateToChipColor = (state: InstanceState): ChipColor => {
  return state === InstanceState.CREATING
    ? ChipColor.DARK_ORANGE
    : ChipColor.GREEN;
};

export { instanceStateToChipColor };
