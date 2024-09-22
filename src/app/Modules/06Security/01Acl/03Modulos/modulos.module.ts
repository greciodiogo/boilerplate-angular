import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulosRoutingModule } from './modulos-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingModule } from '@app/shared/components/loading/loading.module';
import { ModulosPermissoessComponent } from './modulos-permissoes/modulos-permissoes.component';
import { ModuloFormCreateOrEditComponent } from './modulo-form-create-or-edit/modulo-form-create-or-edit.component';
import { ModulosComponent } from './modulos/modulos.component';
import { TableCheckedComponent } from './table-checked/table-checked.component';
import { TableUncheckedComponent } from './table-unchecked/table-unchecked.component';
import { AssociarModulosSubmodulosComponent } from './associar-modulos-submodulos/associar-modulos-submodulos.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { AssociarPermissoesPerfisComponent } from './associar-permissoes-perfis/associar-permissoes-perfis.component';

@NgModule({
  declarations: [ModulosPermissoessComponent, ModuloFormCreateOrEditComponent, ModulosComponent, TableUncheckedComponent, TableCheckedComponent, AssociarModulosSubmodulosComponent, AssociarPermissoesPerfisComponent],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    SharedGlobalModule,
    SharedMaterialModule,
    MatTableModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    LoadingModule,
    NgSelectModule,
    MatAutocompleteModule,
    ColorPickerModule
    
  ]
})
export class ModulosModule { }
