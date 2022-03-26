import { FC } from 'react';
import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  handleBackPage: () => void;
  handleNextPage: () => void;
  allPage: number;
  currentPage: number;
  countItems: number;
};

const Pagination: FC<Props> = ({
  handleBackPage,
  handleNextPage,
  allPage,
  currentPage,
  countItems,
}) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.countItems}>
        <div className={styles.count}>{countItems} results</div>
      </div>
      <div className={styles.currentPage}>
        <IconButton
          onClick={handleBackPage}
          icon={IconName.ARROW_LEFT}
          label="ArrowRight"
        />
        <div>{currentPage}</div>
        <div className={styles.count}>of {allPage}</div>
        <IconButton
          onClick={handleNextPage}
          icon={IconName.ARROW_RIGHT}
          label="ArrowRight"
        />
      </div>
    </div>
  );
};

export { Pagination };
