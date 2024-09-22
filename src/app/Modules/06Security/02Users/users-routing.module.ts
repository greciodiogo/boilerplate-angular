import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';

import { UserListComponent } from './02user-list/user-list.component';
import { UserFormCreateOrEditComponent } from './01user-form-create-or-edit/user-form-create-or-edit.component';


const routes: Routes = [
  {
    path: 'listar',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      expectedPermission: 'listar-utilizadores',
      title: 'Utilizadores',
      layout: {
        customLayout: true,
        layoutNavigationTop: false,
      },
    },
  },
  {
    path: 'registar',
    component: UserFormCreateOrEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: 'criar-utilizadores',
      title: 'Registar Utilizador',
      layout: {
        customLayout: true,
        layoutNavigationTop: false,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
