type UseSelectedItemsHook<T> = {
  selectedItems: T[];
  handleAdd: (id: T) => void;
  handleRemove: (id: T) => void;
  handleCheck: (id: T) => boolean;
  handleRemoveAll: () => void;
  handleReset: (newItems: T[]) => void;
};

export { type UseSelectedItemsHook };
