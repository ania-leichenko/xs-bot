import { FC } from 'react';
import { Checkbox, SectionLineVertical } from 'components/common/common';
import styles from './worker.module.scss';
import { useState } from 'hooks/hooks';

type Props = {
  name: string;
  groups?: string;
  lastActivity?: string;
  creationTime?: string;
  id: string;
};

const Worker: FC<Props> = ({ name, groups, lastActivity, creationTime }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.worker}>
      <div className={styles.item1}>
        <Checkbox label={''} onChange={handleChecked} isChecked={isChecked} />
      </div>
      <SectionLineVertical position={'4.1%'} />

      <div className={styles.item2}>
        <h3 className={styles.workerName}>{name}</h3>
      </div>
      <div className={styles.item3}>
        <p className={styles.title}>{groups}</p>
      </div>
      <div className={styles.item4}>
        <p className={styles.title}>{lastActivity}</p>
      </div>
      <div className={styles.item5}>
        <p className={styles.title}>{creationTime}</p>
      </div>
    </div>
  );
};
export { Worker };
