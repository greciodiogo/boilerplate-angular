import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';

import { RoleListarComponent } from './role-listar/role-listar.component';
import { RoleFormCreateOrEditComponent } from './role-form-create-or-edit/role-form-create-or-edit.component';



const routes: Routes = [
  {
    path: 'listar',
    component: RoleListarComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Roles", 
      layout:{
        customLayout: true, 
        layoutNavigationTop: false, 
      }
    } 
  },{
    path: 'registar',
    component: RoleFormCreateOrEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-roles",    
      title: "Registar Role", 
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
export class RolesRoutingModule { }
