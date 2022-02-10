import { FC } from 'react';
import { Routes, Route, PrivateRoute, Toaster } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.loadCurrentUser());
  }, [dispatch]);

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
      <Toaster />
    </>
  );
};

export { App };
