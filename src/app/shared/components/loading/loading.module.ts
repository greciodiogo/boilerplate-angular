import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading'; 
import { LoadingComponent } from './ngx-loading/loading.component';


@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
  ],exports:[LoadingComponent]
})
export class LoadingModule { }
