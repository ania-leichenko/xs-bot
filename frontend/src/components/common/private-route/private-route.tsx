import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import {
  // useLocation,
  useAppSelector,
} from 'hooks/hooks';
import { Navigate } from 'components/common/common';
// import { notification } from 'services/services';

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

  // const { pathname } = useLocation();

  // let requiredPermission: string;

  // switch (pathname) {
  //   case AppRoute.EAM: {
  //     requiredPermission = 'manage-eam';
  //     break;
  //   }
  //   case AppRoute.BS: {
  //     requiredPermission = 'manage-bs';
  //     break;
  //   }
  //   case AppRoute.SC: {
  //     requiredPermission = 'manage-sc';
  //     break;
  //   }
  //   case AppRoute.SLC: {
  //     requiredPermission = 'manage-slc';
  //     break;
  //   }
  //   default: {
  //     requiredPermission = '';
  //   }
  // }

  // let permissions = (user as EAMMasterByIdResponseDto)?.permissions;
  // permissions = ['manage-sc'];
  // console.log(user?.permissions);
  // console.log(requiredPermission);
  // console.log(user);
  // console.log(user?.permissions.includes(requiredPermission));

  // if (requiredPermission) {
  //   if (!permissions.includes(requiredPermission)) {
  //     notification.error('Error!', `${requiredPermission} permission is required`);
  //     return <Navigate to={AppRoute.ROOT} />
  //   }
  // }

  return <>{component}</>;
};

export { PrivateRoute };
