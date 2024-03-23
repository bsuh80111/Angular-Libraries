import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { TableColumnDirective } from './table-column/table-column.directive';

@NgModule({
  declarations: [
    TableComponent,
    TableColumnDirective
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    TableComponent,
    TableColumnDirective
  ]
})
export class TableModule { }
