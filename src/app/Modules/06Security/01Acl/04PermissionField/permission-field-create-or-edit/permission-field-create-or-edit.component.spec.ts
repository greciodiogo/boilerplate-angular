import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFieldCreateOrEditComponent } from './permission-field-create-or-edit.component';

describe('PermissionFieldCreateOrEditComponent', () => {
  let component: PermissionFieldCreateOrEditComponent;
  let fixture: ComponentFixture<PermissionFieldCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionFieldCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFieldCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
