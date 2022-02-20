type UseSelectedItemsHook<T> = {
  selected: T[];
  push: (id: T) => void;
  remove: (id: T) => void;
  has: (id: T) => boolean;
};

export { type UseSelectedItemsHook };
