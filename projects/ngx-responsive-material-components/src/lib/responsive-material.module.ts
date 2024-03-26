import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    TableModule,
    SearchModule
  ]
})
export class ResponsiveMaterialModule { }
