type UseSelectedItemsHook = {
  selected: string[];
  push: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

export { type UseSelectedItemsHook };
