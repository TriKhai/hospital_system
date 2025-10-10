export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortValue?: (row: T) => unknown;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onRowClick?: (row: T) => void;
  selectedRowId?: string | number;
  rowKey: keyof T;
};

export type SortOrder = 'asc' | 'desc' | 'none';
