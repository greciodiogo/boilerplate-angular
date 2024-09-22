import { NgModule } from '@angular/core';

import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './00Login/login.component';
import { RecuperarPasswordComponent } from './00Login/recuperar-password/recuperar-password.component';

@NgModule({
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    AuthenticationRoutingModule,
  ],
  declarations: [LoginComponent, RecuperarPasswordComponent],
  providers: [
  ],
})
export class AuthenticationModule {}
