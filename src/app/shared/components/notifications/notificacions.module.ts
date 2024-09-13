import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { NotificationInputsComponent } from './notification-inputs/notification-inputs.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertComponent, NotificationInputsComponent, NotificationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],exports:[ 
    AlertComponent,
    NotificationInputsComponent, 
    NotificationFormComponent
  ]
})
export class NotificationsModule { }
