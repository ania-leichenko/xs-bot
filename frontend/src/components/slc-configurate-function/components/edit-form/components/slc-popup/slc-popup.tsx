import { FC } from 'react';
import styles from './styles.module.scss';
import { ButtonStyle, EditorLang } from 'common/enums/enums';
import { Button, Editor, Modal } from 'components/common/common';
import { useState } from 'hooks/hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRun: (payload?: string) => void;
}

const SLCPopup: FC<Props> = ({ isOpen, onRun, onClose }) => {
  const [value, setValue] = useState<string>('');

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
          onChangeValue={setValue}
          lang={EditorLang.JSON}
          placeholder={
            'Enter your arguments in JSON format.(optional)\nExample: { "key": "value" }'
          }
          height={300}
        ></Editor>
        <div className={styles.buttons}>
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            className={styles.button}
            label="Cancel"
            onClick={onClose}
          ></Button>
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Run"
            onClick={handleOnRun}
          ></Button>
        </div>
      </div>
    </Modal>
  );
};

export { SLCPopup };
