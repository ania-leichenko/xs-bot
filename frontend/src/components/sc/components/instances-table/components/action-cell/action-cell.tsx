import styles from './styles.module.scss';
import deleteIcon from 'assets/img/delete-icon.svg';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { Button } from 'components/common/common';

const ActionCell = (
  id: string,
  onDeleteInstance: (id: string) => void,
): JSX.Element => {
  const handleDeleteInstance = (): void => {
    onDeleteInstance(id);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.editButton}
        to={`${AppRoute.SC_CONFIGURATE_INSTANCE}/${id}`}
        label="Edit"
      ></Button>
      <button className={styles.button} onClick={handleDeleteInstance}>
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );
};

export { ActionCell };
