import { IconButton } from 'components/common/icon-button/icon-button';
import { IconName, AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onInstanceDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onInstanceDelete(id);
  };
  return (
    <div className={styles.wrapper}>
      <IconButton
        icon={IconName.GEAR}
        label="Edit"
        to={`${AppRoute.SC_CONFIGURATE_INSTANCE}/${id}`}
      />
      <IconButton icon={IconName.TRASH} label="Delete" onClick={handleDelete} />
    </div>
  );
};

export { ActionCell };
