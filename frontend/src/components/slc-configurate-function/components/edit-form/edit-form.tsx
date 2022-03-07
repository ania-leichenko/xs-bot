import { FC } from 'react';
import { AppRoute, ButtonStyle } from 'common/enums/enums';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';

const EditForm: FC = () => {
  return (
    <>
      <h3 className={styles.formTitle}>Edit Function</h3>;
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
