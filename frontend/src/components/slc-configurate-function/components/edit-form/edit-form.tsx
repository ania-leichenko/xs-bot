import { FC } from 'react';
import { AppRoute, ButtonStyle, DataStatus } from 'common/enums/enums';
import { Button, Editor, Loader, Navigate } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { SLCFunctionConfigurate as SLCFunctionActions } from 'store/actions';
import styles from './styles.module.scss';

interface Props {
  id: string;
}

const EditForm: FC<Props> = ({ id }) => {
  const { dataStatus, loadFunction } = useAppSelector(
    ({ SLCFunctionConfigurate }) => ({
      dataStatus: SLCFunctionConfigurate.dataStatus,
      loadFunction: SLCFunctionConfigurate.loadFunction,
    }),
  );

  const [editCode, setEditCode] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SLCFunctionActions.loadFunction({ id }));
  }, [dispatch]);

  useEffect(() => {
    setEditCode(loadFunction?.sourceCode ?? '');
  }, [loadFunction]);

  if (dataStatus === DataStatus.REJECTED) {
    return <Navigate to={AppRoute.SLC} />;
  }
  return (
    <>
      <h3 className={styles.formTitle}>Edit Function</h3>;
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button btnStyle={ButtonStyle.FILLED} label="Run" />
        </div>
        <div className={styles.button}>
          <Button btnStyle={ButtonStyle.FILLED} label="Save" />
        </div>
      </div>
      {dataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <Editor value={editCode} onChangeValue={setEditCode} />
      )}
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            label="Cancel"
            to={AppRoute.SLC}
          />
        </div>
      </div>
    </>
  );
};

export { EditForm };
