import { SpacesTableAccessor } from 'common/enums/enums';
import { BSSpaceGetResponseItemDto } from 'common/types/types';
import { ActionCell } from 'components/bs/components/spaces-table/components/components';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [SpacesTableAccessor.SPACE_NAME]: string;
  [SpacesTableAccessor.CREATION_TIME]: string;
  [SpacesTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  spaces,
  onSpaceDelete,
}: {
  spaces: BSSpaceGetResponseItemDto[];
  onSpaceDelete: (id: string) => void;
}): Row[] => {
  return spaces.map((item) => {
    const { name, createdAt, id } = item;

    return {
      [SpacesTableAccessor.SPACE_NAME]: name,
      [SpacesTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [SpacesTableAccessor.ACTIONS]: ActionCell(id, onSpaceDelete),
    };
  });
};

export { getRows };
