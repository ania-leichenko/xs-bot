import { FC } from 'react';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { app as appActions } from 'store/actions';
import { DataStatus } from 'common/enums/enums';
import { ServicesList } from './components/components';
import styles from './styles.module.scss';
import { Button } from '../common/button/button';
import { CreateGroupForm } from './components/create-group-form/create-group-form';

const Dashboard: FC = () => {
  const { user, tenantStatus } = useAppSelector(({ app, auth }) => ({
    user: auth.user,
    tenantStatus: app.dataStatus,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(appActions.getTenant({ id: user.tenantId }));
  }, [user, dispatch]);

  const isLoading = tenantStatus !== DataStatus.FULFILLED;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <ServicesList />
      <Button label={'add group'} />
      <CreateGroupForm />
    </div>
  );
};
export { Dashboard };
