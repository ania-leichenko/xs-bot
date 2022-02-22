import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { bs as bsActions } from 'store/actions';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as BSActions } from 'store/actions';
import { BSSpaceDeleteParamsDto } from 'common/types/types';

const BS: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleSpaceDelete = (payload: BSSpaceDeleteParamsDto): void => {
    dispatch(BSActions.deleteSpace(payload));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <SpacesTable handleSpaceDelete={handleSpaceDelete}>
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
