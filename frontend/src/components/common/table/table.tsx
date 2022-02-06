import React from 'react';
import { useTable } from 'react-table';

import styles from './table.module.scss';

interface ISchemaItem {
  Header: string;
  accessor: string;
}

interface ISchemaItems extends Array<ISchemaItem> {}

type Props = {
  columns: ISchemaItems;
  data: Record<string, unknown>[];
};

const Table: React.FC<Props> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.clientSideTable}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className={styles.tableHeaderRow}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className={styles.tableHeaderCell}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className={styles.tableRow} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={styles.tableCell}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
