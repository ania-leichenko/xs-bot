import { FC, useEffect } from 'react';
import { Header } from 'components/common/common';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { app as appActions } from 'store/actions';

const Dashboard: FC = () => {
  const { user, tenant, tenantStatus } = useAppSelector(({ app, auth }) => ({
    user: auth.user,
    tenant: app.tenant,
    tenantStatus: app.dataStatus,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(appActions.getTenant({ id: user.tenantId }));
  }, [user, dispatch]);

  return (
    <div>
      {tenantStatus === 'fulfilled' ? (
        <Header name={tenant?.name ?? 'Binary studio'} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export { Dashboard };
