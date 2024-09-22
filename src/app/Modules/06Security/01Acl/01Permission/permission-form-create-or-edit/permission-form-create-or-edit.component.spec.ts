import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFormCreateOrEditComponent } from './permission-form-create-or-edit.component';

describe('PermissionFormCreateOrEditComponent', () => {
  let component: PermissionFormCreateOrEditComponent;
  let fixture: ComponentFixture<PermissionFormCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionFormCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
