import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsideRightComponent } from './aside-right/aside-right.component';
@NgModule({
  declarations: [AsideRightComponent],
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    MatProgressBarModule,
  ],
  exports: [AsideRightComponent],
})
export class AsideRightModule {}
