import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { GroupsTableHeaders, GroupsTableAccessors } from 'common/enums/enums';

const GroupsTable: FC = () => {
  const { groups } = useAppSelector(({ eam }) => ({
    groups: eam.groups,
  }));

  const data = useMemo(() => {
    const rows: unknown[] = [];

    groups.forEach((item) => {
      const { name, users, permissions, createdAt } = item;
      const permissionsContent = permissions
        .map((item) => item.name)
        .join(', ');
      rows.push({
        [GroupsTableAccessors.GROUP_NAME]: name,
        [GroupsTableAccessors.USERS]: users.length,
        [GroupsTableAccessors.PERMISSIONS]: permissionsContent,
        [GroupsTableAccessors.CREATION_TIME]: createdAt,
      });
    });

    return rows;
  }, [groups]);

  const columns = useMemo(
    () => [
      {
        Header: GroupsTableHeaders.GROUP_NAME,
        accessor: GroupsTableAccessors.GROUP_NAME,
      },
      {
        Header: GroupsTableHeaders.USERS,
        accessor: GroupsTableAccessors.USERS,
      },
      {
        Header: GroupsTableHeaders.PERMISSIONS,
        accessor: GroupsTableAccessors.PERMISSIONS,
      },
      {
        Header: GroupsTableHeaders.CREATION_TIME,
        accessor: GroupsTableAccessors.CREATION_TIME,
      },
      {
        Header: GroupsTableHeaders.ACTIONS,
        accessor: GroupsTableAccessors.ACTIONS,
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} title={'Groups'} />;
};

export { GroupsTable };
