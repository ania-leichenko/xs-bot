import { FC } from 'react';
import { Checkbox } from 'components/common/common';
import styles from './worker.module.scss';
import { useState } from 'hooks/hooks';

type Props = {
  name: string;
  id: string;
};

const Worker: FC<Props> = ({ name }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.worker}>
      <Checkbox label={''} onChange={handleChecked} isChecked={isChecked} />
      <h3 className={styles.workerName}>{name}</h3>
    </div>
  );
};

export { Worker };
