import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableColumnDirective } from './table-column/table-column.directive';

@NgModule({
  declarations: [
    TableComponent,
    TableColumnDirective
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    TableComponent,
    TableColumnDirective
  ]
})
export class TableModule { }
