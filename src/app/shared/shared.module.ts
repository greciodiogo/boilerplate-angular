import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { NgxLoadingModule } from 'ngx-loading'; 
import { SharedMaterialModule } from './sharedMaterial.module';
import { NotificationsModule } from './components/notifications/notificacions.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule, 
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot(),
    NgxLoadingModule, 
    SharedMaterialModule,
    NotificationsModule
  ],
  exports: [], 
})
export class SharedModule { }
