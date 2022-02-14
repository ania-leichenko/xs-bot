import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from '../../../common/common';

const GroupsTable: FC = () => {
  const { groups } = useAppSelector(({ eam }) => ({
    groups: eam.groups,
  }));
  const transformGroups: unknown[] = [];
  groups.forEach((item) => {
    const { permissions, users } = item;
    const usersCount = users.length;
    const permissionsSt = permissions.map((item) => item.name).join(', ');

    transformGroups.push({
      ...item,
      usersCount,
      permissions: permissionsSt,
    });
  });
  const columns = useMemo(
    () => [
      {
        Header: 'Group name',
        accessor: 'name',
      },
      {
        Header: 'Users',
        accessor: 'usersCount',
      },
      {
        Header: 'Permissions',
        accessor: 'permissions',
      },
      {
        Header: 'Creation time',
        accessor: 'createdAt',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
    [],
  );

  const data = useMemo(() => transformGroups, [groups]);

  return <Table columns={columns} data={data} title={'Groups'} />;
};

export { GroupsTable };
