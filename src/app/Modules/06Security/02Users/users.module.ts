import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './02user-list/user-list.component';
import { UserFormCreateOrEditComponent } from './01user-form-create-or-edit/user-form-create-or-edit.component';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserRolesCreateOrEditComponent } from './03user-roles-create-or-edit/user-roles-create-or-edit.component';
import { TableCheckedComponent } from './components/table-checked/table-checked.component';
import { PasswordModule } from './components/password/password.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormCreateOrEditComponent,
    UserRolesCreateOrEditComponent,
    TableCheckedComponent,
  ],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    UsersRoutingModule,
    ArchwizardModule,
    MatTableModule,
    MatCheckboxModule,
    PasswordModule
  ],
})
export class UsersModule {}
