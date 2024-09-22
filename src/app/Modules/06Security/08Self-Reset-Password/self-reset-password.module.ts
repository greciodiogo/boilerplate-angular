import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfResetPasswordRoutingModule } from '../08Self-Reset-Password/self-reset-password-routing.module';
import { SelfResetPasswordComponent } from '../08Self-Reset-Password/self-reset-password/self-reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@app/shared/components/loading/loading.module';


@NgModule({
  declarations: [SelfResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingModule,
    SelfResetPasswordRoutingModule
  ],providers:[]
})
export class SelfResetPasswordModule { }
