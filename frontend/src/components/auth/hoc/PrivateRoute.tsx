import { Navigate, useAppSelector } from 'hooks/hooks';
import { AppRoute, DataStatus } from 'common/enums/enums';
type Props = {
  children: JSX.Element;
};
function PrivateRoute({ children }: Props): JSX.Element {
  const user: DataStatus = useAppSelector((state) => state.auth.dataStatus);
  if (user === 'fulfilled') {
    return children;
  }
  return <Navigate to={AppRoute.SIGN_UP} />;
}
export { PrivateRoute };
