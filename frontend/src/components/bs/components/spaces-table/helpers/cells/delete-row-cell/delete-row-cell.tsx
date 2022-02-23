import styles from './styles.module.scss';
import deleteIcon from 'assets/img/delete-icon.svg';

const DeleteRowCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  const handleSpaceDelete = (): void => {
    onSpaceDelete(id);
  };

  return (
    <button className={styles.button} onClick={handleSpaceDelete}>
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
};

export { DeleteRowCell };
