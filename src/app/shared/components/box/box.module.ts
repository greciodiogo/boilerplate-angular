import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box/box.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { InfoBoxComponent } from './info-box/info-box.component';

@NgModule({
  declarations: [BoxComponent, InfoBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot(),
    LoadingModule
  ],
  exports: [BoxComponent, InfoBoxComponent],
})
export class BoxModule {}
