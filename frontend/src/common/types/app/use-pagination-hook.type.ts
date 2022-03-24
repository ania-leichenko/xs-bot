type UsePaginationtemsHook = {
  handleBackPage: () => void;
  handleNextPage: () => void;
  allPage: number;
  currentPage: number;
  countItems: number;
} | null;

export { type UsePaginationtemsHook };
