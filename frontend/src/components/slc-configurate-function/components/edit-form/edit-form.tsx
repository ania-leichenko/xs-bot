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
  const hasSave = loadFunction?.sourceCode === editCode;
  const hasCodeLoading = dataStatus === DataStatus.PENDING;
  const isPossibleRun = hasSave && !hasCodeLoading;
  const isPossibleSave = !hasSave && !hasCodeLoading;

  useEffect(() => {
    dispatch(SLCFunctionActions.loadFunction({ id }));
  }, [dispatch]);

  useEffect(() => {
    setEditCode(loadFunction?.sourceCode ?? '');
  }, [loadFunction]);

  const handleSaveCode = (): void => {
    dispatch(
      SLCFunctionActions.updateFunction({
        params: { id },
        payload: { sourceCode: editCode },
      }),
    );
  };

  if (dataStatus === DataStatus.REJECTED) {
    return <Navigate to={AppRoute.SLC} />;
  }
  return (
    <>
      <h3 className={styles.formTitle}>Edit Function</h3>;
      <div className={styles.buttons}>
        <div className={styles.button}>
          {isPossibleRun ? (
            <Button btnStyle={ButtonStyle.FILLED} label="Run" />
          ) : (
            <Button btnStyle={ButtonStyle.OUTLINED} label="Run" />
          )}
        </div>
        <div className={styles.button}>
          {isPossibleSave ? (
            <Button
              btnStyle={ButtonStyle.FILLED}
              label="Save"
              onClick={handleSaveCode}
            />
          ) : (
            <Button btnStyle={ButtonStyle.OUTLINED} label="Save" />
          )}
        </div>
      </div>
      {hasCodeLoading ? (
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
