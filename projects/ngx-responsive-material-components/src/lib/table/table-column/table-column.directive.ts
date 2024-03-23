import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'responsive-table-column'
})
export class TableColumnDirective {

  @Input({ required: true }) key!: string;
  @ContentChild(TemplateRef) columnTemplate: TemplateRef<any> | null = null;

}
