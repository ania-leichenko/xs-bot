import { FC } from 'react';
import { Routes, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';
import { PrivateRoute } from 'components/common/private-route/private-route';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route
          path={AppRoute.ROOT}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export { App };
