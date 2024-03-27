export type TableType = 'flex' | 'native';

export type TableColumn = {
  key: string;
  header: string;
  sortable?: boolean;
  visible?: boolean;
  searchable?: boolean;
};

export type RowOptionSelectedEvent<T> = {
  option: string;
  rowData: T;
};
