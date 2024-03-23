export type TableType = 'flex' | 'native';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  visible?: boolean;
}
