import { FC } from 'react';
import styles from './styles.module.scss';
import { FunctionsTable } from './components/components';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { slc as slcActions } from 'store/actions';

const SLC: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      slcActions.loadFunctions({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleFunctionDelete = (id: string): void => {
    dispatch(slcActions.deleteFunction(id));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <div className={styles.tableWrapper}>
        <FunctionsTable
          onFunctionDelete={handleFunctionDelete}
        ></FunctionsTable>
      </div>
    </div>
  );
};

export { SLC };
