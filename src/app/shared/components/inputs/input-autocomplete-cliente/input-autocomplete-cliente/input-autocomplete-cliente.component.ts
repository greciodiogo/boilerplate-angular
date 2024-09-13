import { HttpParams } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  Self,
  Optional,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Cliente } from '@app/resources/Modules/01CRM/models/Cliente';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FormService } from '@app/shared/services/form.service';
import { finalize } from 'rxjs/operators';

export class _filter extends Filter {
  typeClientId: string = '';
  document: string;
  pais: string;
  provincia: string;
  municipio: string;
  estado: string;
}
@Component({
  selector: 'input-autocomplete-clients',
  templateUrl: './input-autocomplete-cliente.component.html',
  styleUrls: ['./input-autocomplete-cliente.component.css'],
})
export class InputAutocompleteClienteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() status: string = '2';
  @Input() filter = new _filter();

  public value: any = '';

  @Output() public selected = new EventEmitter<any>();
  @Output() public clear = new EventEmitter<any>();

  loading: boolean = false;

  clients: any = [];

  public historyHeading: string = 'Recentemente selecionado';

  constructor(
    public formService: FormService,
    // Retrieve the dependency only from the local injector,
    // not from parent or ancestors.
    @Self()
    // We want to be able to use the component without a form,
    // so we mark the dependency as optional.
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  public onChange(event) {
    this.value = event;
  }
  public onTouched() {}

  public searchCliente(value) {
    if (value == '') return;
    this.selected.emit(new Cliente());
    var httpParams = new HttpParams()
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('typeClientId', this.filter.typeClientId || '')
      .set('status', this.status.toString());

    this.inputCleared();
    this.clients = [];
    const search = value;
    this.loading = true;
    this.formService
      .searchClientes(search, httpParams)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (data) => {
          this.clients = data.data;
          if (this.filter.typeFilter) {
            this.selectEvent(this.clients[0]);
          }
        },
        (error) => {}
      );
  }

  selectEvent(item) {
    this.onChange(item.id);
    this.selected.emit(item);
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // console.log('aui')
    this.onChange(val);
    this.searchCliente(val);

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    //this.inputCleared();
    // do something when input is focused
  }

  inputCleared() {
    this.onChange(null);
    this.clear.emit(new Cliente());
  }
}
