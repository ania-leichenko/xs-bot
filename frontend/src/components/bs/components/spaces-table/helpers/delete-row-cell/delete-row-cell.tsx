import styles from './styles.module.scss';
import { BSSpaceDeleteParamsDto } from 'common/types/types';

const DeleteRowCell = (
  id: string,
  handleSpaceDelete: (payload: BSSpaceDeleteParamsDto) => void,
): JSX.Element => {
  return (
    <div
      id={id}
      onClick={(): void => {
        handleSpaceDelete({ id });
      }}
      className={styles.icon}
    >
      {' '}
    </div>
  );
};

export { DeleteRowCell };
