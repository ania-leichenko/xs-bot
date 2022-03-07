import { Row } from 'react-table';
import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const EditGroupRowCell = ({
  original,
}: Row<Record<string, string>>): JSX.Element => {
  return (
    <div>
      <Link to={`${AppRoute.EAM_CONFIGURATE_GROUP}?id=${original.id}`}>
        <div className={styles.edit} />
      </Link>
    </div>
  );
};

export { EditGroupRowCell };
