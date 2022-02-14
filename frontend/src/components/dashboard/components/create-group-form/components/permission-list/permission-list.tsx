import { FC } from 'react';
import { Permission } from '../permission/permission';
import styles from './permission-list.module.scss';
import { Checkbox, SectionLineVertical } from 'components/common/common';

const PermissionList: FC = () => {
  return (
    <div className={styles.permissionList}>
      <div className={styles.listHeader}>
        <div className={styles.item1}>
          <Checkbox label={''} isDisabled={true} />
        </div>
        <SectionLineVertical position={'4%'} />
        <div className={styles.item2}>
          <p className={styles.headerText}>Police name</p>
        </div>
        <SectionLineVertical position={'61%'} />
        <div className={styles.item3}>
          <p className={styles.headerText}>Type</p>
        </div>
        <SectionLineVertical position={'80%'} />
        <div className={styles.item4}>
          <p className={styles.headerText}>Description</p>
        </div>
      </div>
      <ul>
        <li>
          <Permission name={'Permission'} id={'aa'} />
        </li>
      </ul>
    </div>
  );
};

export { PermissionList };
