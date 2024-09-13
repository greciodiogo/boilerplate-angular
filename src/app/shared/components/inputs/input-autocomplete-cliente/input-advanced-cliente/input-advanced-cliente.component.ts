import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Self, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Cliente } from '@app/resources/Modules/01CRM/models/Cliente';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FormService } from '@app/shared/services/form.service';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
  import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'input-advanced-clients',
  templateUrl: './input-advanced-cliente.component.html',
  styleUrls: ['./input-advanced-cliente.component.css'],
})
export class InputAdvancedClienteComponent
  implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() filter = new Filter();
  @Input() loading: boolean = false;
  public value: any = "";

  @Output() public selected = new EventEmitter<any>();



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
    this.value = value
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
    this.value = event
  }
  public onTouched() {

  }

  public searchCliente(value) {
    if(value=="") return;
    var httpParams = new HttpParams()
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
    this.inputCleared();
    this.clients = [];
    const search = value;
    this.loading = true;
    this.formService
      .searchClienteAdvanced(search,httpParams)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (data) => {
          this.clients = data;
          if(this.filter.typeFilter){
              this.selectEvent(this.clients[0]);
          }
        },
        (error) => {
        }
      );
  }

  selectEvent(item) {
    this.onChange(item.id)
    this.selected.emit(item);
    // do something with selected item
  }

  onChangeSearch(val: string) {
    this.onChange(val)
     this.searchCliente(val);
     //this.onFilterTextChanged(val)

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    //this.inputCleared();
    // do something when input is focused
  }

  inputCleared(){
    this.onChange(null)
    this.selected.emit(new Cliente());
  }



  filterTextChanged: Subject<string> = new Subject<string>();

  // debounce filter text changes
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(filterQuery => {
          this.loadData(filterQuery);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(filterQuery: string = null) {
    this.searchCliente(filterQuery);
  }

}
