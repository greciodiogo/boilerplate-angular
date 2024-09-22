import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { ModulosPermissoessComponent } from './modulos-permissoes/modulos-permissoes.component';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';
import { ModulosComponent } from './modulos/modulos.component';
import { AssociarModulosSubmodulosComponent } from './associar-modulos-submodulos/associar-modulos-submodulos.component';
import { AssociarPermissoesPerfisComponent } from './associar-permissoes-perfis/associar-permissoes-perfis.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ModulosComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Módulos", 
      layout:{
        customLayout: true, 
        layoutNavigationTop: false, 
      }
    } 
  },
  {
    path: 'associar-permissao-modulo',
    component: ModulosPermissoessComponent,
    // canActivate: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard],
    data: {
      expectedPermission: "listar-modulos-permissoes",    
      title: "Associar Permissões com Módulos", 
      layout:{
        customLayout: true, 
        layoutNavigationTop: false, 
      }
    } 
  },
  {
    path: 'associar-modulos-submodulos',
    component: AssociarModulosSubmodulosComponent,
    // canActivate: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard],
    data: {
      expectedPermission: "listar-modulos-sobmodulos",    
      title: "Associar Permissões com Módulos", 
      layout:{
        customLayout: true, 
        layoutNavigationTop: false, 
      }
    } 
  },
  {
    path: 'associar-permissoes-perfis',
    component: AssociarPermissoesPerfisComponent,
    // canActivate: [AuthGuard, PermissionGuard],
    canActivate: [AuthGuard],
    data: {
      expectedPermission: "listar-roles",    
      title: "Associar Permissões aos Perfis", 
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
export class ModulosRoutingModule { }
