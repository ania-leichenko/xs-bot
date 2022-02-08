import { RouteProps, Navigate } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';

type Props = RouteProps & {
  redirectTo?: AppRoute;
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  children,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
export { PrivateRoute };
