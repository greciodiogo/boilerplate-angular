import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleListarComponent } from './role-listar/role-listar.component';
import { RoleFormCreateOrEditComponent } from './role-form-create-or-edit/role-form-create-or-edit.component';

import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { TableCheckedComponent } from './table-checked/table-checked.component';
import { RolePermissionCreateOrEditComponent } from './role-permission-create-or-edit/role-permission-create-or-edit.component';
import { LoadingModule } from '@app/shared/components/loading/loading.module';
import { NotificationsModule } from '@app/shared/components/notifications/notificacions.module';


@NgModule({
  declarations: [
    RoleListarComponent,
    RoleFormCreateOrEditComponent,
    TableCheckedComponent,
    RolePermissionCreateOrEditComponent,
  ],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    MatTableModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    MatCheckboxModule,
    LoadingModule,
    NotificationsModule
  
  ],
})
export class RolesModule {}
