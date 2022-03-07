import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const EditRowCell = (id: string): JSX.Element => {
  return (
    <Link
      className={styles.redirect}
      to={`${AppRoute.SLC_CONFIGURATE_FUNCTION}/${id}`}
    >
      Edit
    </Link>
  );
};

export { EditRowCell };
