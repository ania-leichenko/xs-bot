import { FC } from 'react';
import { AppRoute, ButtonStyle } from 'common/enums/enums';
import { Button } from 'components/common/common';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styles from './styles.module.scss';

const EditForm: FC = () => {
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
      <CodeMirror
        height="500px"
        extensions={[javascript()]}
        placeholder="Source code can't be empty."
      />
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
