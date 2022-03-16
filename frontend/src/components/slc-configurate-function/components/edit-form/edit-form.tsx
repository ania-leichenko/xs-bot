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
import { debounce } from 'helpers/helpers';
import styles from './styles.module.scss';

interface Props {
  id: string;
}

const EditForm: FC<Props> = ({ id }) => {
  const { dataStatus, loadFunction, response } = useAppSelector(
    ({ SLCFunctionConfigurate }) => ({
      dataStatus: SLCFunctionConfigurate.dataStatus,
      loadFunction: SLCFunctionConfigurate.loadFunction,
      response: SLCFunctionConfigurate.response,
    }),
  );
  const [editCode, setEditCode] = useState<string>('');
  const dispatch = useAppDispatch();
  const hasSave = loadFunction?.sourceCode === editCode;
  const hasCodeLoading = dataStatus === DataStatus.PENDING;
  const isPossibleSave = !hasSave && !hasCodeLoading;
  const hasResponse = Boolean(response);

  useEffect(() => {
    dispatch(SLCFunctionActions.loadFunction({ id }));
  }, [dispatch]);

  useEffect(() => {
    setEditCode(loadFunction?.sourceCode ?? '');
  }, [loadFunction]);

  const handleRun = (): void => {
    dispatch(SLCFunctionActions.runFunction({ id }));
  };

  const handleSaveCode = (): void => {
    dispatch(
      SLCFunctionActions.updateFunction({
        params: { id },
        payload: { sourceCode: editCode },
      }),
    );
  };

  const handleOnChangeValue = debounce(setEditCode, 500);

  const handleCancel = (): void => {
    dispatch(SLCFunctionActions.resetFunction());
  };

  if (dataStatus === DataStatus.REJECTED) {
    return <Navigate to={AppRoute.SLC} />;
  }
  return (
    <>
      <h3 className={styles.formTitle}>Edit Function</h3>;
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{loadFunction?.name ?? ''}</h4>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Run"
            onClick={handleRun}
          />
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Save"
            onClick={handleSaveCode}
            disabled={isPossibleSave ? false : true}
          />
        </div>
      </div>
      {hasResponse && (
        <>
          <h4 className={styles.title}>Response</h4>
          <p className={styles.response}>{response?.payload}</p>
        </>
      )}
      {hasCodeLoading ? (
        <Loader />
      ) : (
        <Editor value={editCode} onChangeValue={handleOnChangeValue} />
      )}
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            label="Cancel"
            onClick={handleCancel}
          />
        </div>
      </div>
    </>
  );
};

export { EditForm };
