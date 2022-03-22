import { FC } from 'react';
import { IconButton } from 'components/common/common';
import { IconName, Page } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useState } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import styles from './styles.module.scss';

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState(0);

  const { tenantId, countItems: countItems } = useAppSelector(
    ({ app, eam }) => ({
      tenantId: app.tenant?.id,
      countItems: eam.countItems,
    }),
  );
  const allPage = Math.ceil(countItems / Page.PER_PAGE);

  const handleLoadWorkers = (from: number): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: from,
        count: 5,
      }),
    );
  };

  const handleBackPage = (): void => {
    const backPage = currentPage - Page.CURRENT_PAGE;
    if (backPage !== 0) {
      setCurrentPage(backPage);
      const backFrom = from - Page.BACK_PAGE;
      setFrom(backFrom);
      handleLoadWorkers(from - Page.BACK_PAGE);
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + Page.CURRENT_PAGE;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + Page.NEXT_PAGE;
      setFrom(nextForm);
      handleLoadWorkers(from + Page.NEXT_PAGE);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.countItems}>
        <div className={styles.count}>{countItems + 'results'}</div>
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
