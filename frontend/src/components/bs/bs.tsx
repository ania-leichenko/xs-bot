import { useAppDispatch, useEffect } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as bsActions } from 'store/actions';

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

  const handleSpaceDelete = (id: string): void => {
    dispatch(bsActions.deleteSpace(id));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <SpacesTable onSpaceDelete={handleSpaceDelete}></SpacesTable>
      </div>
    </div>
  );
};

export { BS };
