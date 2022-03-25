import { IconButton } from 'components/common/common';
import { AppRoute, IconName } from 'common/enums/enums';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onGroupDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onGroupDelete(id);
  };
  return (
    <div className={styles.wrapper}>
      <IconButton
        title="Delete"
        icon={IconName.TRASH}
        label="Delete"
        onClick={handleDelete}
      />
      <Link to={`${AppRoute.EAM_CONFIGURATE_GROUP}?id=${id}`}>
        <div className={styles.edit} />
      </Link>
    </div>
  );
};

export { ActionCell };
