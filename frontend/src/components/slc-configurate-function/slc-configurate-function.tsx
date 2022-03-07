import { FC } from 'react';
import { Routes, Route } from 'components/common/common';
import { CreateForm, EditForm } from './components/components';
import styles from './styles.module.scss';

const SLCConfigurateFunction: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <section className={styles.formWrapper}>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/:id" element={<EditForm />} />
        </Routes>
      </section>
    </div>
  );
};

export { SLCConfigurateFunction };
