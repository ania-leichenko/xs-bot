import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { Navigate } from 'components/common/common';

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

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  const requiredPermission = permissions.filter((permission) => {
    return user?.permissions.some(
      (userPermission) => userPermission === permission,
    );
  });
  const hasRequiredPermission = Boolean(requiredPermission.length);

  if (permissions.length && !hasRequiredPermission) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return <>{component}</>;
};

export { PrivateRoute };
