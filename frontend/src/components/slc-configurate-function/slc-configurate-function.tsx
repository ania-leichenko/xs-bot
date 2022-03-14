import { FC } from 'react';
import { CreateForm, EditForm } from './components/components';
import { useParams } from 'hooks/hooks';
import styles from './styles.module.scss';
const SLCConfigurateFunction: FC = () => {
  const { id } = useParams<string>();
  const hasId = Boolean(id);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <section className={styles.formWrapper}>
        {hasId ? <EditForm id={id as string} /> : <CreateForm />}
      </section>
    </div>
  );
};

export { SLCConfigurateFunction };
