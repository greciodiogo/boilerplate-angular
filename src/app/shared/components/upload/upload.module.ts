import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadAnexoModalComponent } from './upload-anexo-modal/upload-anexo-modal.component';
import { ButtonFileUploadModule } from '../button-file-upload/button-file-upload.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [UploadAnexoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonFileUploadModule,
    ModalModule.forRoot(),
    LoadingModule
  ],
  exports:[UploadAnexoModalComponent]
})
export class UploadModule { }
