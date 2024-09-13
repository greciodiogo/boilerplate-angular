import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteClienteComponent } from './input-autocomplete-cliente.component';

describe('InputAutocompleteClienteComponent', () => {
  let component: InputAutocompleteClienteComponent;
  let fixture: ComponentFixture<InputAutocompleteClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAutocompleteClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutocompleteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
