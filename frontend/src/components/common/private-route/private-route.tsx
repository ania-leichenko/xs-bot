import { FC, ReactNode } from 'react';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { Navigate, Loader } from 'components/common/common';

type Props = {
  redirectTo: AppRoute;
  component: ReactNode;
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user, userStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    userStatus: auth.dataStatus,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    if (userStatus === DataStatus.IDLE) {
      return <Navigate to={redirectTo} />;
    }
    if (userStatus !== DataStatus.FULFILLED) {
      return <Loader />;
    }
  }

  return <>{component}</>;
};

export { PrivateRoute };
