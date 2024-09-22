import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloFormCreateOrEditComponent } from './modulo-form-create-or-edit.component';

describe('ModuloFormCreateOrEditComponent', () => {
  let component: ModuloFormCreateOrEditComponent;
  let fixture: ComponentFixture<ModuloFormCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloFormCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloFormCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
