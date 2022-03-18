import { FC } from 'react';
import { ChipStyle } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  value: string;
  chipStyle?: ChipStyle;
};

const Chip: FC<Props> = ({ value, chipStyle = ChipStyle.FILLED }) => {
  const fullClassName = getValidClasses(
    styles.chip,
    styles[`chipStyle${chipStyle}`],
  );

  return <button className={fullClassName}>{value}</button>;
};

export { Chip };
