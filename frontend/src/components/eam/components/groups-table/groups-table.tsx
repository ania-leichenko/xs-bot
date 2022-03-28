import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus, Pagination } from 'common/enums/enums';
import { eam as eamActions } from 'store/actions';

type Props = {
  onGroupDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const GroupsTable: FC<Props> = ({ children, onGroupDelete }) => {
  const dispatch = useAppDispatch();

  const { groups, groupsDataStatus, countItems, tenantId } = useAppSelector(
    ({ app, eam }) => ({
      groups: eam.groups,
      groupsDataStatus: eam.groupsDataStatus,
      countItems: eam.groupsCountAll,
      tenantId: app.tenant?.id,
    }),
  );

  const isLoading = groupsDataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: from,
        count: count,
      }),
    );
  };

  const groupPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const data = useMemo(() => getRows({ groups, onGroupDelete }), [groups]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Groups"
      placeholder="No groups to display"
      dataTestid="eam-group-table"
      pagination={groupPagination}
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { GroupsTable };
