import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteClienteComponent } from './input-autocomplete-cliente/input-autocomplete-cliente.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputAdvancedClienteComponent } from './input-advanced-cliente/input-advanced-cliente.component';
import { UpperCaseTextDirective } from '@app/shared/directives/upper-case.directive';


@NgModule({
  declarations: [InputAutocompleteClienteComponent, InputAdvancedClienteComponent],
  exports:[InputAutocompleteClienteComponent, InputAdvancedClienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class InputAutocompleteClienteModule { }
