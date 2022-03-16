import { FC } from 'react';
import { useParams } from 'hooks/hooks';
import {
  CreateInstanceForm,
  UpdateInstanceForm,
} from './components/components';
import styles from './styles.module.scss';

const SCConfigurateInstance: FC = () => {
  const { id } = useParams();
  const title = id ? 'Edit Instance' : 'Create Instance';

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>{title}</h3>
        {id ? <UpdateInstanceForm id={id} /> : <CreateInstanceForm />}
      </section>
    </div>
  );
};

export { SCConfigurateInstance };
