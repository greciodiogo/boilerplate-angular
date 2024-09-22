import { NgModule } from '@angular/core';
import { PermissionFieldsRoutingModule } from './permission-fields-routing.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { PermissionFieldCreateOrEditComponent } from './permission-field-create-or-edit/permission-field-create-or-edit.component';
import { PermissionFieldListComponent } from './permission-field-list/permission-field-list.component';


@NgModule({
  declarations: [PermissionFieldCreateOrEditComponent,PermissionFieldListComponent],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    PermissionFieldsRoutingModule,
    ColorPickerModule,
    NgSelectModule
  ]
})
export class PermissionFieldsModule { }
