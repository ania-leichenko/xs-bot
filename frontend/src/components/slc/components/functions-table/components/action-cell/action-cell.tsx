import { IconButton, Button } from 'components/common/common';
import { AppRoute, IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const url = `${AppRoute.SLC_CONFIGURATE_FUNCTION}/${id}`;

  const handleDelete = (): void => {
    onFunctionDelete(id);
  };
  return (
    <div className={styles.actionsWrapper}>
      <IconButton icon={IconName.TRASH} label="Delete" onClick={handleDelete} />
      <Button className={styles.editButton} label="Edit" to={url as AppRoute} />
    </div>
  );
};

export { ActionCell };
