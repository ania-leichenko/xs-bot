import { FC } from 'react';
import styles from './styles.module.scss';
import { ButtonStyle, EditorLang } from 'common/enums/enums';
import { Button, Editor, Modal } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { debounce } from 'helpers/helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRun: (payload?: string) => void;
}

const TIMEOUT = 500;

const SLCPopup: FC<Props> = ({ isOpen, onRun, onClose }) => {
  const [value, setValue] = useState<string>('');

  const handleOnChangeValue = debounce(setValue, TIMEOUT);

  const handleOnRun = (): void => {
    onRun(value);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{'Pass function arguments'}</h4>
        <Editor
          value={value}
          onChangeValue={handleOnChangeValue}
          lang={EditorLang.JSON}
          placeholder={
            'Enter your arguments in JSON format.(optional)\nExample: { "key": "value" }'
          }
          height={300}
        />
        <div className={styles.buttons}>
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            className={styles.button}
            label="Cancel"
            onClick={onClose}
          />
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Run"
            onClick={handleOnRun}
          />
        </div>
      </div>
    </Modal>
  );
};

export { SLCPopup };
