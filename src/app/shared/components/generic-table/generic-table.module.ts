import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatCellPipe } from './table/format-cell.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [TableComponent, FormatCellPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    NgxPaginationModule,
  ],
  exports: [TableComponent],
})
export class GenericTableModule {}
