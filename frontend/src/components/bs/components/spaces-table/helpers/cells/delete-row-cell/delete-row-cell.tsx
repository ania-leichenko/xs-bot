import styles from './styles.module.scss';
import deleteIcon from 'assets/img/delete-icon.svg';

const DeleteRowCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  return (
    <button
      className={styles.button}
      onClick={(): void => {
        onSpaceDelete(id);
      }}
    >
      <img src={deleteIcon} alt={'Delete'} />
    </button>
  );
};

export { DeleteRowCell };
