import styles from './styles.module.scss';
import deleteIcon from '../../../../../../assets/img/delete-icon.svg';
import { BSSpaceDeleteParamsDto } from 'common/types/types';

const DeleteRowCell = (
  id: string,
  handleSpaceDelete: (payload: BSSpaceDeleteParamsDto) => void,
): JSX.Element => {
  return (
    <img
      src={deleteIcon}
      alt={'Delete'}
      onClick={(): void => {
        handleSpaceDelete({ id });
      }}
      className={styles.icon}
    />
  );
};

export { DeleteRowCell };
