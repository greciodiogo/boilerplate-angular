import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DeleteDataComponent } from './delete-data/delete-data.component';
@NgModule({
  declarations: [DeleteDataComponent],
  imports: [
    CommonModule
  ],
  exports: [DeleteDataComponent]
})
export class DeleteDataModule { }
