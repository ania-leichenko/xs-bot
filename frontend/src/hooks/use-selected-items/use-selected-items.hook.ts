import { useState } from 'hooks/hooks';
import { UseSelectedItemsHook } from 'common/types/types';

const useSelectedItems = <T>(items: T[]): UseSelectedItemsHook<T> => {
  const [selected, setSelected] = useState<T[]>(items);
  const push = (id: T): void => {
    setSelected((prevState) => prevState.concat(id));
  };

  const remove = (id: T): void => {
    setSelected((prevState) => prevState.filter((it) => it !== id));
  };

  const has = (id: T): boolean => {
    return selected.some((it): boolean => it === id);
  };

  return { selected, push, remove, has };
};

export { useSelectedItems };
