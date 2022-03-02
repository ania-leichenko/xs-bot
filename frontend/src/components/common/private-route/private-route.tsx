import { FC, ReactNode } from 'react';
import {
  AppRoute,
  NotificationMessage,
  NotificationTitle,
  NotificationType,
} from 'common/enums/enums';
import { useAppSelector, useEffect, useAppDispatch } from 'hooks/hooks';
import { app as appActions } from 'store/actions';
import { Navigate } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';

type Props = {
  redirectTo: AppRoute;
  component: ReactNode;
  permissions: string[];
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  permissions,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);
  const hasRoutePermissions = Boolean(permissions.length);
  const hasUserPermission = checkHasPermission(
    permissions,
    user?.permissions ?? [],
  );

  useEffect(() => {
    if (!hasRoutePermissions || hasUserPermission) {
      return;
    }

    dispatch(
      appActions.notify({
        title: NotificationTitle.ERROR,
        message: NotificationMessage.EAM_PERMISSION_LACK,
        type: NotificationType.ERROR,
      }),
    );
  }, [hasRoutePermissions, hasUserPermission]);

  if (!hasUser || !hasUserPermission) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { PrivateRoute };
