import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSelectColumnComponent } from './table-select-column/table-select-column.component';


@NgModule({
  declarations: [TableSelectColumnComponent],
  imports: [
    CommonModule,
  ],exports:[TableSelectColumnComponent]
})
export class TableModule { }
