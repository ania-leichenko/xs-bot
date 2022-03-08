import deleteIcon from 'assets/img/delete-icon.svg';
import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionsRowCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const handleFunctionDelete = (): void => {
    onFunctionDelete(id);
  };

  return (
    <div className={styles.actionsWrapper}>
      <button className={styles.button} onClick={handleFunctionDelete}>
        <img src={deleteIcon} alt="Delete" />
      </button>
      <Link
        className={styles.redirect}
        to={`${AppRoute.SLC_CONFIGURATE_FUNCTION}/${id}`}
      >
        Edit
      </Link>
    </div>
  );
};

export { ActionsRowCell };
