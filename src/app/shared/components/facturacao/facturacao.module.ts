import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ArchwizardModule } from 'angular-archwizard';

import { ItemsFacturacaoComponent } from './items-facturacao/items-facturacao.component';



@NgModule({
  declarations: [ItemsFacturacaoComponent],
  imports: [
    CommonModule,
    SharedGlobalModule,
    SharedMaterialModule,
    ModalModule.forRoot(),
    ArchwizardModule
  ],exports:[ItemsFacturacaoComponent]
})
export class FacturacaoModule { }
