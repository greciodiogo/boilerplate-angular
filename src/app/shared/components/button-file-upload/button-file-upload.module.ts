import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonFileUploadComponent } from './button-file-upload/button-file-upload.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [ButtonFileUploadComponent],
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    MatProgressBarModule,
  ],
  exports: [ButtonFileUploadComponent],
})
export class ButtonFileUploadModule {}
