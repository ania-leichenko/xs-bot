import { FC } from 'react';
import { ChipColor, ChipStyle } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  chipStyle?: ChipStyle;
  chipColor?: ChipColor;
};

const Chip: FC<Props> = ({
  children,
  chipStyle = ChipStyle.FILLED,
  chipColor = ChipColor.GRAY,
}) => {
  const fullClassName = getValidClasses(
    styles.chip,
    styles[`chipStyle${chipStyle}`],
    styles[`chipColor${chipColor}`],
  );

  return <span className={fullClassName}>{children}</span>;
};

export { Chip };
