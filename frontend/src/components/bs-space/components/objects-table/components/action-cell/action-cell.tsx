import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onObjectDownload: (objectId: string) => void,
  onObjectDelete: (objectId: string) => void,
): JSX.Element => {
  const handleDownload = (): void => {
    onObjectDownload(id);
  };
  const handleDelete = (): void => {
    onObjectDelete(id);
  };

  return (
    <div className={styles.wrapper}>
      <IconButton
        title="Download"
        icon={IconName.DOWNLOAD}
        label="Download"
        onClick={handleDownload}
      />
      <IconButton
        title="Delete"
        icon={IconName.TRASH}
        label="Delete"
        onClick={handleDelete}
      />
    </div>
  );
};

export { ActionCell };
