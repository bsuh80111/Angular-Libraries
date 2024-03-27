import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RowOptionSelectedEvent, TableColumn, TableType } from '../table.model';
import { TableColumnDirective } from '../table-column/table-column.directive';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ScreenSizeService } from '../../screen-size';
import { SearchService } from '../../search';

const OPTIONS_COLUMN_KEY = 'options';
const DATA_STRING_SEPARATOR = '!@#';

@Component({
  selector: 'responsive-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T extends Record<string, unknown>> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

  /** Key that uniquely identifies the table */
  @Input({ required: true }) key!: string;

  /** Input data to build table with */
  @Input({ required: true }) data!: T[];

  /** Table column configurations */
  @Input({ required: true }) tableColumns!: TableColumn[];

  /** Type of table to render. Either native-HTML-table-based or flexbox-based */
  @Input() tableType: TableType = 'flex';

  /** Search string to filter table data */
  @Input() searchString?: string;

  /** Paginator page size configuration. If not provided, no pagination will occur */
  @Input() pageSizeOptions?: number[];

  /** List of options to generate for each table row */
  @Input() rowOptions: string[] = [];

  /** Emits when user selects an option */
  @Output() rowOptionSelected: EventEmitter<RowOptionSelectedEvent<T>> = new EventEmitter();

  @ContentChildren(TableColumnDirective) tableColumnTemplates!: QueryList<TableColumnDirective>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  tableDataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  get columnsToDisplay(): string[] {
    return this.tableColumns.reduce((acc: string[], tableColumn: TableColumn) => {
      if (tableColumn.visible === true || tableColumn.visible === undefined) {
        acc.push(tableColumn.key);
      }
      return acc;
    }, []);
  };
  get tableColumnsToDisplay(): string[] {
    const columns = this.columnsToDisplay;
    if (this.rowOptions.length > 0) {
      columns.push(OPTIONS_COLUMN_KEY);
    }

    return columns;
  }
  columnTemplates: Record<string, TemplateRef<any> | null> = {};
  private readonly destroy$ = new Subject<void>();

  searchStringSubject: Subject<string> = new Subject();

  constructor(
    protected screenSizeService: ScreenSizeService,
    protected searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.tableDataSource.data = this.data;
      this.cdr.detectChanges();
    }

    // In case the paginator's rendering is impacted, attempt to reattach paginator to datasource
    if (changes['pageSizeOptions']) {
      this.setTableDataSourcePaginator();
    }

    if (changes['searchString']) {
      this.searchStringSubject.next(this.searchString ?? '');
    }
  }

  ngAfterViewInit(): void {
    this.setTableDataSourcePaginator();
  }

  ngAfterContentInit(): void {
    // Map custom column templates to their keys
    this.tableColumnTemplates.changes.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (templates: QueryList<TableColumnDirective>) => {
        this.columnTemplates = {};
        for (const columnDefinition of templates.toArray()) {
          this.columnTemplates[columnDefinition.key] = columnDefinition.columnTemplate;
        }
      }
    });

    this.tableColumnTemplates.notifyOnChanges(); // Manual trigger since first query doesn't trigger the changes observable
  }

  private initializeSearch() {
    // Debounce search and apply search filter
    this.searchStringSubject.pipe(
      debounceTime(250),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (searchString: string) => {
        this.tableDataSource.filter = searchString;
        return searchString;
      }
    });

    // Initialize table data filtering with support for special characters and diacritics
    this.tableDataSource.filterPredicate = (data: T, filter: string): boolean => {
      let dataString = '';

      for (const tc of this.tableColumns) {
        // Table column will not be searchable if marked unsearchable or if a custom template is provided (since we can't guarantee that the key exists in the data object)
        if (tc.searchable === false || tc.visible === false || this.columnTemplates[tc.key]) {
          continue;
        }

        dataString += data[tc.key];
        dataString += DATA_STRING_SEPARATOR;
      }

      return this.searchService.matchExists(dataString, filter);
    };
  }

  private setTableDataSourcePaginator() {
    if (!this.paginator) {
      return;
    }

    if (this.pageSizeOptions && this.pageSizeOptions.length > 0) {
      this.tableDataSource.paginator = this.paginator;
      this.cdr.detectChanges(); // Required since paginator can alter emitted data from datasource
    } else {
      this.tableDataSource.paginator = null;
    }
  }

  protected getTableColumnHeaderByKey(key: string): string | undefined {
    return this.tableColumns.find((tc) => tc.key === key)?.header;
  }
  
  protected _rowOptionSelected(option: string, rowData: T) {
    this.rowOptionSelected.emit({
      option,
      rowData
    });
  }
}
