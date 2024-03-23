import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn, TableType } from '../table.model';
import { TableColumnDirective } from '../table-column/table-column.directive';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'responsive-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterContentInit, OnChanges, OnDestroy {

  @Input({ required: true }) data!: unknown[];
  @Input({ required: true }) tableColumns!: TableColumn[];
  @Input() tableType: TableType = 'flex';
  @ContentChildren(TableColumnDirective) tableColumnTemplates!: QueryList<TableColumnDirective>;
  columnsToDisplay: string[] = [];
  columnTemplates: Record<string, TemplateRef<any> | null> = {};
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      // Init MatTableDataSource
    }

    if (changes['tableColumns']?.currentValue) {
      this.columnsToDisplay = this.tableColumns.map(tc => tc.key);
    }
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
}
