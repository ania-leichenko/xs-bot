import { SpacesTableAccessor } from 'common/enums/enums';
import { BSSpaceGetResponseItemDto } from 'common/types/types';
import { ActionCell, BsSpaceLink } from '../components/components';

type Row = {
  [SpacesTableAccessor.SPACE_NAME]: JSX.Element;
  [SpacesTableAccessor.CREATED_AT]: string;
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
      [SpacesTableAccessor.SPACE_NAME]: BsSpaceLink(name, id),
      [SpacesTableAccessor.CREATED_AT]: createdAt,
      [SpacesTableAccessor.ACTIONS]: ActionCell(id, onSpaceDelete),
    };
  });
};

export { getRows };
