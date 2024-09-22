import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';
import { PermissionFieldCreateOrEditComponent } from './permission-field-create-or-edit/permission-field-create-or-edit.component';
import { PermissionFieldListComponent } from './permission-field-list/permission-field-list.component';


const routes: Routes = [
  {
    path: 'listar',
    component: PermissionFieldListComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Listar Permissões de Campos",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },
  {
    path: 'registar',
    component: PermissionFieldCreateOrEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-permissoes",
      title: "Registar Permissão de Campo",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionFieldsRoutingModule { }
