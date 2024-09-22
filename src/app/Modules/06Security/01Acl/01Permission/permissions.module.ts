import { NgModule } from '@angular/core';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionFormCreateOrEditComponent } from './permission-form-create-or-edit/permission-form-create-or-edit.component';
import { PermissionListarComponent } from './permission-listar/permission-listar.component';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { AddPermissionRoleComponent } from './add-permission-role/add-permission-role.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PermissionFormCreateOrEditComponent, PermissionListarComponent, AddPermissionRoleComponent],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    PermissionsRoutingModule,
    ColorPickerModule,
    NgSelectModule
  ]
})
export class PermissionsModule { }
