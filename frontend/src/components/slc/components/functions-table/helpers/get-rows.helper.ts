import { FunctionsTableAccessor } from 'common/enums/enums';
import { SLCFunctionGetResponseItemDto } from 'common/types/types';
import { ActionCell } from '../components/components';
import { getDateDecoratedWithAgo } from 'helpers/helpers';

type Row = {
  [FunctionsTableAccessor.FUNCTION_NAME]: string;
  [FunctionsTableAccessor.CREATION_TIME]: string;
  [FunctionsTableAccessor.UPDATION_TIME]: string;
  [FunctionsTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  slcFunctions,
  onFunctionDelete,
}: {
  slcFunctions: SLCFunctionGetResponseItemDto[];
  onFunctionDelete: (id: string) => void;
}): Row[] => {
  return slcFunctions.map((item) => {
    const { id, name, createdAt, updatedAt } = item;

    return {
      [FunctionsTableAccessor.FUNCTION_NAME]: name,
      [FunctionsTableAccessor.CREATION_TIME]: getDateDecoratedWithAgo(
        new Date(createdAt),
      ),
      [FunctionsTableAccessor.UPDATION_TIME]: getDateDecoratedWithAgo(
        new Date(updatedAt),
      ),
      [FunctionsTableAccessor.ACTIONS]: ActionCell(id, onFunctionDelete),
    };
  });
};

export { getRows };
