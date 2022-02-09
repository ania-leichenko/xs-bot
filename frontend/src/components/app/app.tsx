import { FC } from 'react';
import { Routes, Route, PrivateRoute } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <PrivateRoute path={AppRoute.ROOT} element={<Dashboard />} />
      </Routes>
    </>
  );
};

export { App };
