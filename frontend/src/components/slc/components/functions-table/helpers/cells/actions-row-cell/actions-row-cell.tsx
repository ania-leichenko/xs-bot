import { DeleteRowCell } from './delete-row-cell/delete-row-cell';
import { EditRowCell } from './edit-row-cell/edit-row-cell';
import styles from './styles.module.scss';

const ActionsRowCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  return (
    <div className={styles.actionsWrapper}>
      {DeleteRowCell(id, onFunctionDelete)}
      {EditRowCell(id)}
    </div>
  );
};

export { ActionsRowCell };
