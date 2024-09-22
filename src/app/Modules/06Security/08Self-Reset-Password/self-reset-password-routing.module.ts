import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfResetPasswordComponent } from './self-reset-password/self-reset-password.component';

const routes: Routes = [{ path: 'reset/:token', component: SelfResetPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfResetPasswordRoutingModule { }
