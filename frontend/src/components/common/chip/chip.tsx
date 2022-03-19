import { FC } from 'react';
import { ChipColor, ChipStyle, IconName, IconSource } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  chipStyle?: ChipStyle;
  chipColor?: ChipColor;
  icon?: IconName;
};

const Chip: FC<Props> = ({
  children,
  chipStyle = ChipStyle.FILLED,
  chipColor = ChipColor.GRAY,
  icon,
}) => {
  const fullClassName = getValidClasses(
    styles.chip,
    styles[`chipStyle${chipStyle}`],
    styles[`chipColor${chipColor}`],
  );

  return (
    <span className={fullClassName}>
      {icon && (
        <img className={styles.icon} src={IconSource[icon]} alt={icon} />
      )}
      {children}
    </span>
  );
};

export { Chip };
