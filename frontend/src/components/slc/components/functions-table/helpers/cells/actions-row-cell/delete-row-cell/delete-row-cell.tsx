import deleteIcon from 'assets/img/delete-icon.svg';
import styles from './styles.module.scss';

const DeleteRowCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const handleFunctionDelete = (): void => {
    onFunctionDelete(id);
  };

  return (
    <button className={styles.button} onClick={handleFunctionDelete}>
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
};

export { DeleteRowCell };
