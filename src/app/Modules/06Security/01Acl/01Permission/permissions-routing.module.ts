import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';

import { PermissionListarComponent } from './permission-listar/permission-listar.component';
import { PermissionFormCreateOrEditComponent } from './permission-form-create-or-edit/permission-form-create-or-edit.component';

import { AddPermissionRoleComponent } from './add-permission-role/add-permission-role.component';

const routes: Routes = [
  {
    path: 'listar',
    component: PermissionListarComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Permissões",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },{
    path: 'registar',
    component: PermissionFormCreateOrEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-permissoes",
      title: "Registar Permissão",
      layout:{
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },{
    path: 'add/role',
    component: AddPermissionRoleComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-permissoes",
      title: "Adicionar",
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
export class PermissionsRoutingModule { }
