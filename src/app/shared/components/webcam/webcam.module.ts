import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamComponent } from './webcam/webcam.component';
import { WebcamModalComponent } from './webcam-modal/webcam-modal.component';



@NgModule({
  declarations: [WebcamComponent, WebcamModalComponent],
  imports: [
    CommonModule
  ]
})
export class WebcamModule { }
