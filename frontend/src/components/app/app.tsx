import { FC } from 'react';
import {
  Routes,
  Route,
  AuthorizedRoute,
  Toaster,
  Loader,
} from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { auth as authActions, app as appActions } from 'store/actions';
import { AppRoute, StorageKey } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';
import { storage } from 'services/services';
import { EAM } from 'components/eam/eam';
import { EAMWorkerCreate } from 'components/eam-create-worker/eam-create-worker';
import { EAMConfigurateGroup } from 'components/eam-configurate-group/eam-configurate-group';

const App: FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const dispatch = useAppDispatch();
  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(appActions.getTenant({ id: user.tenantId }));
  }, [user, dispatch]);

  if (!hasUser && hasToken) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route
          path={AppRoute.ROOT}
          element={<AuthorizedRoute component={<Dashboard />} />}
        />
        <Route
          path={AppRoute.EAM_CONFIGURATE_GROUP}
          element={<AuthorizedRoute component={<EAMConfigurateGroup />} />}
        />
        <Route
          path={AppRoute.EAM}
          element={<AuthorizedRoute component={<EAM />} />}
        />
        <Route
          path={AppRoute.EAM_CREATE_WORKER}
          element={<AuthorizedRoute component={<EAMWorkerCreate />} />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export { App };
