import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    TableModule
  ]
})
export class ResponsiveMaterialModule { }
