import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableColumnDirective } from './table-column/table-column.directive';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [
    TableComponent,
    TableColumnDirective
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    SearchModule
  ],
  exports: [
    TableComponent,
    TableColumnDirective
  ]
})
export class TableModule { }
