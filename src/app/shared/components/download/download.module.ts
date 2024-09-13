import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDownloadComponent } from './button-download/button-download.component';
import { getSaver, SAVER } from '@app/shared/services/saver.provider';


@NgModule({
  declarations: [ButtonDownloadComponent],
  imports: [
    CommonModule
  ],exports:[
    ButtonDownloadComponent
  ],providers: [
    {provide: SAVER, useFactory: getSaver},
  ]
})
export class DownloadModule { }
