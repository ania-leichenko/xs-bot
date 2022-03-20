import {
  UseResizeColumnsOptions,
  UseResizeColumnsColumnProps,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseResizeColumnsOptions<D>,
      Record<string, any> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsColumnProps<D> {}
}
