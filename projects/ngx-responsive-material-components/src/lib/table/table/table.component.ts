import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, Input, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn, TableType } from '../table.model';
import { TableColumnDirective } from '../table-column/table-column.directive';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ScreenSizeService } from '../../screen-size';

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

  /** Paginator page size configuration. If not provided, no pagination will occur */
  @Input() pageSizeOptions?: number[];

  @ContentChildren(TableColumnDirective) tableColumnTemplates!: QueryList<TableColumnDirective>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  tableDataSource!: MatTableDataSource<T>; // Guaranteed to exist since data is a required input property (See ngOnChanges)
  get columnsToDisplay(): string[] {
    return this.tableColumns.reduce((acc: string[], tableColumn: TableColumn) => {
      if (tableColumn.visible === true || tableColumn.visible === undefined) {
        acc.push(tableColumn.key);
      }
      return acc;
    }, []);
  };
  columnTemplates: Record<string, TemplateRef<any> | null> = {};
  private readonly destroy$ = new Subject<void>();

  constructor(
    protected screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.tableDataSource = new MatTableDataSource(this.data);
    }

    // In case the paginator's rendering is impacted, attempt to reattach paginator to datasource
    if (changes['pageSizeOptions']) {
      this.setTableDataSourcePaginator();
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
}
