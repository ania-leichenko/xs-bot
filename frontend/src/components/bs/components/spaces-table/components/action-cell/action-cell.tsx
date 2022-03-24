import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onSpaceDelete(id);
  };
  return (
    <div className={styles.wrapper}>
      <IconButton icon={IconName.TRASH} label="Delete" onClick={handleDelete} />
    </div>
  );
};

export { ActionCell };
