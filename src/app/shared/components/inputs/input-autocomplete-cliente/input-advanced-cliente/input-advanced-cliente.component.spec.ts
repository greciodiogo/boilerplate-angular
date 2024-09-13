import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAdvancedClienteComponent } from './input-advanced-cliente.component';

describe('InputAdvancedClienteComponent', () => {
  let component: InputAdvancedClienteComponent;
  let fixture: ComponentFixture<InputAdvancedClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAdvancedClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAdvancedClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
