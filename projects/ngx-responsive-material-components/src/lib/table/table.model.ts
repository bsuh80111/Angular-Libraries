export type TableType = 'flex' | 'native';

export type TableColumn<T> = {
  key: string;
  header: string;
  sortable?: boolean;
  visible?: boolean;
  searchable?: boolean;
  customDataGenerator?: (data: T) => string;
  /**
   * @deprecated Requires use of ::ng-deep
   */
  deepCssClasses?: string[];
  /**
   * @deprecated Requires use of ::ng-deep
   */
  deepCssClassGenerator?: (data: T) => string[] | undefined;
};

export type RowOptionSelectedEvent<T> = {
  option: string;
  rowData: T;
};
