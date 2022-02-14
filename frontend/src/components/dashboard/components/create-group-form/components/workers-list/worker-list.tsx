import { FC } from 'react';
import { Worker } from '../worker/worker';
import styles from './worker-list.module.scss';

const WorkerList: FC = () => {
  return (
    <div className={styles.worker_list}>
      <ul>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
        <li>
          <Worker name={'w1'} id={'aa'} />
        </li>
      </ul>
    </div>
  );
};

export { WorkerList };
