type UseSelectedItemsHook<T> = {
  selectedItems: T[];
  handleAdd: (id: T) => void;
  handleRemove: (id: T) => void;
  handleCheck: (id: T) => boolean;
  handleRemoveAll: () => void;
};

export { type UseSelectedItemsHook };
