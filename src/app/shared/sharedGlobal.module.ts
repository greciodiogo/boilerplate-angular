import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from './components/loading/loading.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BackdropBlurModule } from './components/backdrop-blur/backdrop-blur.module';
import { DeleteDataModule } from './components/delete-data/delete-data.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GenericTableModule } from './components/generic-table/generic-table.module';
import { ButtonFileUploadModule } from '@app/shared/components/button-file-upload/button-file-upload.module';
import { InputAutocompleteClienteModule } from '@app/shared/components/inputs/input-autocomplete-cliente/input-autocomplete-cliente.module';
import { NotificationsModule } from './components/notifications/notificacions.module';
import { TableModule } from './components/table/table.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MgxCircularProgressBarModule,
  MgxCircularProgressFullBarModule,
  MgxCircularProgressPieModule } from'mgx-circular-progress-bar';
import { AsideRightModule } from './components/aside-right/aside-right.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot(),
    LoadingModule,
    NgxLoadingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BackdropBlurModule,
    DeleteDataModule,
    GenericTableModule,
    InputAutocompleteClienteModule,
    ButtonFileUploadModule,
    ModalModule.forRoot(),
    NotificationsModule,
    TableModule,
    NgbTooltipModule,
    MgxCircularProgressBarModule,
  MgxCircularProgressFullBarModule,
  MgxCircularProgressPieModule,
  AsideRightModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    LoadingModule,
    NgxLoadingModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule,
    BackdropBlurModule,
    DeleteDataModule,
    InputAutocompleteClienteModule,
    ButtonFileUploadModule,
    TableModule,
    NgbTooltipModule,
    MgxCircularProgressBarModule,
  MgxCircularProgressFullBarModule,
  MgxCircularProgressPieModule,
  AsideRightModule
  ],
})
export class SharedGlobalModule {}
