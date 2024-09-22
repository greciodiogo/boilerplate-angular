import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';
import { LogOperationsComponent } from './02LogsOperacoes/log-operations.component';
import { LogAccessComponent } from './01LogsAcesso/log-access.component';



const routes: Routes = [
  {
    path: 'acessos',
    component: LogAccessComponent,
    canActivate: [AuthGuard],
    data: {
      expectedPermission: "listar-logs",
      title: "Log Acessos",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },{
    path: 'operations',
    component: LogOperationsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-logs",
      title: "Log Operações",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
