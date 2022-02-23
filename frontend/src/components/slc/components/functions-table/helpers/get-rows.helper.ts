import { FunctionsTableAccessor } from 'common/enums/enums';
import { SLCFunctionGetResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [FunctionsTableAccessor.FUNCTION_NAME]: string;
  [FunctionsTableAccessor.UPDATION_TIME]: string;
};

const getRows = (slcFunctions: SLCFunctionGetResponseItemDto[]): Row[] => {
  return slcFunctions.map((item) => {
    const { name, updatedAt } = item;

    return {
      [FunctionsTableAccessor.FUNCTION_NAME]: name,
      [FunctionsTableAccessor.UPDATION_TIME]: getDistanceToDateNow(
        new Date(updatedAt),
      ),
    };
  });
};

export { getRows };
