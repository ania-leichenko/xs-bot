import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  DataStatus,
  EditorLang,
} from 'common/enums/enums';
import { Button, Editor, Loader, Navigate } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { SLCFunctionConfigurate as SLCFunctionActions } from 'store/actions';
import { debounce } from 'helpers/helpers';
import { SLCPopup } from './components/components';

import styles from './styles.module.scss';

interface Props {
  id: string;
}

const TIMEOUT = 500;

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
  const [isVisibleSLCPopup, setVisibleSLCPopup] = useState<boolean>(false);

  useEffect(() => {
    dispatch(SLCFunctionActions.loadFunction({ id }));
  }, [dispatch]);

  useEffect(() => {
    setEditCode(loadFunction?.sourceCode ?? '');
  }, [loadFunction]);

  const handleOpenSLCPopup = (): void => {
    setVisibleSLCPopup(true);
  };

  const handleCloseSLCPopup = (): void => {
    setVisibleSLCPopup(false);
  };

  const handleRun = (payload?: string): void => {
    dispatch(
      SLCFunctionActions.runFunction({
        params: { id },
        payload: { payload },
      }),
    );
  };

  const handleSaveCode = (): void => {
    dispatch(
      SLCFunctionActions.updateFunction({
        params: { id },
        payload: { sourceCode: editCode },
      }),
    );
  };

  const handleOnChangeValue = debounce(setEditCode, TIMEOUT);

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
        <h4 className={styles.title}>{loadFunction?.name as string}</h4>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Run"
            onClick={handleOpenSLCPopup}
          />
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Save"
            onClick={handleSaveCode}
            isDisabled={!isPossibleSave}
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
        <Editor
          value={editCode}
          onChangeValue={handleOnChangeValue}
          lang={EditorLang.JAVASCRIPT}
          placeholder="Source code can't be empty."
        />
      )}
      <div className={styles.buttons}>
        <div>
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.OUTLINED}
            label="Cancel"
            onClick={handleCancel}
          />
        </div>
      </div>
      <SLCPopup
        isOpen={isVisibleSLCPopup}
        onClose={handleCloseSLCPopup}
        onRun={handleRun}
      />
    </>
  );
};

export { EditForm };
