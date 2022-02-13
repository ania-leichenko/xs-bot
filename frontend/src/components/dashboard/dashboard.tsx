import { FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
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

  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false);

  const openHandler = (): void => {
    setIsOpenFormCreate(!isOpenFormCreate);
  };

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
      <Button label={'add group'} onClick={openHandler} />
      <CreateGroupForm isOpen={isOpenFormCreate} openHandler={openHandler} />
    </div>
  );
};
export { Dashboard };
