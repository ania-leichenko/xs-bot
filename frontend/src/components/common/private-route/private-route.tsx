import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { useLocation, useAppSelector } from 'hooks/hooks';
import { Navigate } from 'components/common/common';

type Props = {
  redirectTo: AppRoute;
  component: ReactNode;
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  const { pathname } = useLocation();

  let requiredPermission: string;

  switch (pathname) {
    case AppRoute.EAM: {
      requiredPermission = 'manage-eam';
      break;
    }
    case AppRoute.BS: {
      requiredPermission = 'manage-bs';
      break;
    }
    case AppRoute.SC: {
      requiredPermission = 'manage-sc';
      break;
    }
    case AppRoute.SLC: {
      requiredPermission = 'manage-slc';
      break;
    }
    default: {
      requiredPermission = '';
    }
  }

  if (requiredPermission) {
    if (!user?.permissions.includes(requiredPermission)) {
      return <Navigate to={AppRoute.ROOT} />;
    }
  }

  return <>{component}</>;
};

export { PrivateRoute };
