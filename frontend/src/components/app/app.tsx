import { FC } from 'react';
import { Routes, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import styles from './app.module.scss';

const App: FC = () => {
  return (
    <>
      <div className={styles.authConteiner}>
        <Routes>
          <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        </Routes>
      </div>
    </>
  );
};

export { App };
