import { FC } from 'react';
import { ChipColor, ChipStyle, IconName } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { iconNameToSrc } from 'common/maps/maps';

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
        <img className={styles.icon} src={iconNameToSrc[icon]} alt={icon} />
      )}
      {children}
    </span>
  );
};

export { Chip };
