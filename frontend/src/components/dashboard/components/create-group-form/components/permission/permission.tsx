import { FC } from 'react';
import { Checkbox, SectionLineVertical } from 'components/common/common';
import styles from './permission.module.scss';
import { useState } from 'hooks/hooks';

type Props = {
  name: string;
  type?: string;
  description?: string;
  id: string;
};

const Permission: FC<Props> = ({ name, type, description }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.permission}>
      <div className={styles.item1}>
        <Checkbox label={''} onChange={handleChecked} isChecked={isChecked} />
      </div>
      <SectionLineVertical position={'4.1%'} />

      <div className={styles.item2}>
        <h3 className={styles.permissionName}>{name}</h3>
      </div>
      <div className={styles.item3}>
        <p className={styles.title}>{type}</p>
      </div>
      <div className={styles.item4}>
        <p className={styles.title}>{description}</p>
      </div>
    </div>
  );
};

export { Permission };
