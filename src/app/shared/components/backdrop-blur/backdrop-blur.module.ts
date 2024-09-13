import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { BackdropBlurComponent } from './backdrop-blur/backdrop-blur.component';


@NgModule({
  declarations: [BackdropBlurComponent],
  imports: [
    CommonModule
  ], 
  exports:[BackdropBlurComponent]
})
export class BackdropBlurModule { }
