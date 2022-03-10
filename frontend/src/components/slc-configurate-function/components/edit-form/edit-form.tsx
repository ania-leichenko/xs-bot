import { FC } from 'react';
import { AppRoute, ButtonStyle } from 'common/enums/enums';
import { Button, Editor } from 'components/common/common';
import { useState } from 'hooks/hooks';
import styles from './styles.module.scss';

const EditForm: FC = () => {
  const [value, setValue] = useState<string>('');

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
      <Editor value={value} onChangeValue={setValue} />
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
