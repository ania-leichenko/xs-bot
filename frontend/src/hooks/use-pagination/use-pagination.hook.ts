import { UsePaginationtemsHook } from 'common/types/types';
import { Pagination } from 'common/enums/enums';
import { useState } from 'hooks/hooks';

type UsePaginationArgs = {
  perPage: number;
  countItems: number;
  onLoad: (from: number) => void;
  from?: number;
  currentPage?: number;
};

const usePagination = (
  pagination: UsePaginationArgs,
): UsePaginationtemsHook => {
  const [from, setFrom] = useState(pagination.from ?? 0);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage ?? 1);
  const allPage = Math.ceil(pagination.countItems / pagination.perPage);

  const handleBackPage = (): void => {
    const backPage = currentPage - Pagination.CURRENT_PAGE;
    if (backPage !== 0) {
      setCurrentPage(backPage);
      const backFrom = from - Pagination.PER_PAGE;
      setFrom(backFrom);
      pagination.onLoad(from - Pagination.PER_PAGE);
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + Pagination.CURRENT_PAGE;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + Pagination.PER_PAGE;
      setFrom(nextForm);
      pagination.onLoad(from + Pagination.PER_PAGE);
    }
  };

  return {
    handleBackPage,
    handleNextPage,
    allPage,
    currentPage,
    countItems: pagination.countItems,
  };
};

export { usePagination };
