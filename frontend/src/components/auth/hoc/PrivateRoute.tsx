import { Navigate, useAppSelector, useLocation } from 'hooks/hooks';
import { AppRoute, DataStatus } from 'common/enums/enums';
type Props = {
  children: JSX.Element;
};
function PrivateRoute({ children }: Props): JSX.Element {
  const user: DataStatus = useAppSelector((state) => state.auth.dataStatus);
  const location = useLocation();
  if (user === 'fulfilled') {
    return children;
  }
  return (
    <Navigate to={AppRoute.SIGN_UP} state={{ from: location }} replace={true} />
  );
}
export { PrivateRoute };
