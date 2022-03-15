import { FC } from 'react';
import { AppRoute, ButtonStyle, DataStatus } from 'common/enums/enums';
import { Button, Editor, Loader, Navigate } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { SLCFunctionConfigurate as SLCFunctionActions } from 'store/actions';
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
  const navigate = useNavigate();
  const hasSave = loadFunction?.sourceCode === editCode;
  const hasCodeLoading = dataStatus === DataStatus.PENDING;
  const isPossibleRun = hasSave && !hasCodeLoading;
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

  const handleCancel = (): void => {
    dispatch(SLCFunctionActions.resetFunction());
    navigate(AppRoute.SLC);
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
            <Button
              btnStyle={ButtonStyle.FILLED}
              label="Run"
              onClick={handleRun}
            />
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
      {hasResponse && (
        <>
          <h4 className={styles.titleResponse}>Response</h4>
          <p className={styles.response}>{response?.payload}</p>
        </>
      )}
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
            onClick={handleCancel}
          />
        </div>
      </div>
    </>
  );
};

export { EditForm };
