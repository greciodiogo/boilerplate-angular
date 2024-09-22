import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { RedefinirPasswordComponent } from './redefinir-password/redefinir-password.component';
import { RedefinirPasswordUserLogadoComponent } from './redefinir-password-user-logado/redefinir-password-user-logado.component';
import { LoadingModule } from '@app/shared/components/loading/loading.module';

@NgModule({
  declarations: [RedefinirPasswordComponent, RedefinirPasswordUserLogadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    NgxLoadingModule, 
    LoadingModule,
  ],
  exports: [RedefinirPasswordComponent, RedefinirPasswordUserLogadoComponent]
})
export class PasswordModule { }
