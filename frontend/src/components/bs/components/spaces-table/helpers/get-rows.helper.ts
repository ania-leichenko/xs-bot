import { SpacesTableAccessor } from 'common/enums/enums';
import {
  BSSpaceGetResponseItemDto,
  BSSpaceDeleteParamsDto,
} from 'common/types/types';
import { DeleteRowCell } from 'components/bs/components/spaces-table/helpers/delete-row-cell/delete-row-cell';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [SpacesTableAccessor.SPACE_NAME]: string;
  [SpacesTableAccessor.CREATION_TIME]: string;
  [SpacesTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  spaces,
  handleSpaceDelete,
}: {
  spaces: BSSpaceGetResponseItemDto[];
  handleSpaceDelete: (payload: BSSpaceDeleteParamsDto) => void;
}): Row[] => {
  return spaces.map((item) => {
    const { name, createdAt, id } = item;

    return {
      [SpacesTableAccessor.SPACE_NAME]: name,
      [SpacesTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [SpacesTableAccessor.ACTIONS]: DeleteRowCell(id, handleSpaceDelete),
    };
  });
};

export { getRows };
