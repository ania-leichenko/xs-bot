import { UsePaginationtemsHook } from 'common/types/types';
import { PaginationEnum } from 'common/enums/enums';
import { useState } from 'hooks/hooks';

type UsePaginationArgs = {
  perPage: number;
  countItems: number;
  handleLoad: (from: number) => void;
};

const usePagination = (
  pagination?: UsePaginationArgs,
): UsePaginationtemsHook => {
  if (!pagination) {
    return null;
  }
  const [from, setFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const allPage = Math.ceil(pagination.countItems / pagination.perPage);

  const handleBackPage = (): void => {
    const backPage = currentPage - PaginationEnum.CURRENT_PAGE;
    if (backPage !== 0) {
      setCurrentPage(backPage);
      const backFrom = from - PaginationEnum.PER_PAGE;
      setFrom(backFrom);
      pagination.handleLoad(from - PaginationEnum.PER_PAGE);
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + PaginationEnum.CURRENT_PAGE;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + PaginationEnum.PER_PAGE;
      setFrom(nextForm);
      pagination.handleLoad(from + PaginationEnum.PER_PAGE);
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
