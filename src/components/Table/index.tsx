import { Table as AntDTable, TableProps as AntDTableProps } from 'antd';

export function Table<DataType extends Record<string, unknown> = Record<string, unknown>>({
  ...props
}: AntDTableProps<DataType>) {
  return <AntDTable<DataType> {...props} />;
}
