/* eslint-disable */
import {
  UseResizeColumnsOptions,
  UseResizeColumnsColumnProps,
  UseSortByOptions,
  UseSortByColumnProps,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseResizeColumnsOptions<D>,
      UseSortByOptions<D>,
      Record<string, any> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}
}
