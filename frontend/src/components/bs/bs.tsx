import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as BSActions } from 'store/actions';

const BS: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      BSActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleSpaceDelete = (id: string): void => {
    dispatch(BSActions.deleteSpace(id));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <SpacesTable onSpaceDelete={handleSpaceDelete}>
          <Button
            className={styles.addSpaceBtn}
            to={AppRoute.BS_CREATE_SPACE}
            label="Add Space"
          />
        </SpacesTable>
      </div>
    </div>
  );
};

export { BS };
