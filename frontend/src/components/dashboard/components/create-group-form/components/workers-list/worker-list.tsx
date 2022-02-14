import { FC } from 'react';
import { Worker } from '../worker/worker';
import styles from './worker-list.module.scss';
import { Checkbox, SectionLineVertical } from 'components/common/common';

const WorkerList: FC = () => {
  return (
    <div className={styles.workerList}>
      <div className={styles.listHeader}>
        <div className={styles.item1}>
          <Checkbox label={''} isDisabled={true} />
        </div>
        <SectionLineVertical position={'4%'} />
        <div className={styles.item2}>
          <p className={styles.headerText}>User name</p>
        </div>
        <SectionLineVertical position={'47%'} />
        <div className={styles.item3}>
          <p className={styles.headerText}>Groups</p>
        </div>
        <SectionLineVertical position={'64%'} />
        <div className={styles.item4}>
          <p className={styles.headerText}>Last activity</p>
        </div>
        <SectionLineVertical position={'81%'} />
        <div className={styles.item5}>
          <p className={styles.headerText}>Creation time</p>
        </div>
      </div>
      <ul>
        <li>
          <Worker
            name={'Username'}
            id={'aa'}
            groups={'2'}
            creationTime={'March'}
            lastActivity={'today'}
          />
        </li>
      </ul>
    </div>
  );
};

export { WorkerList };
