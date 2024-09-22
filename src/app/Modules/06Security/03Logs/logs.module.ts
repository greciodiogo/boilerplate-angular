import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';

import { LogsRoutingModule } from './logs-routing.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { LogOperationsComponent } from './02LogsOperacoes/log-operations.component';
import { LogAccessComponent } from './01LogsAcesso/log-access.component';
import { PreviewLogsComponent } from './02LogsOperacoes/preview-logs/preview-logs.component';

@NgModule({
  declarations: [
    LogOperationsComponent,
    LogAccessComponent,
    PreviewLogsComponent,
  ],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    LogsRoutingModule,
    ArchwizardModule,
  ],
})
export class LogsModule {}
