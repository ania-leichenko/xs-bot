import { useState } from 'hooks/hooks';
import { UseSelectedItemsHook } from 'common/types/types';

const useSelectedItems = (): UseSelectedItemsHook => {
  const [selected, setSelected] = useState<string[]>([]);
  const push = (id: string): void => {
    setSelected((prevState) => prevState.concat(id));
  };

  const remove = (id: string): void => {
    setSelected((prevState) => prevState.filter((it) => it !== id));
  };

  const has = (id: string): boolean => {
    return selected.some((it): boolean => it === id);
  };

  return { selected, push, remove, has };
};

export { useSelectedItems };
