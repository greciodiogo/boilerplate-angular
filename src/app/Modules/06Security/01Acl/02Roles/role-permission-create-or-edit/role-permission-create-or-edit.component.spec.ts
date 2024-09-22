import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionCreateOrEditComponent } from './role-permission-create-or-edit.component';

describe('RolePermissionCreateOrEditComponent', () => {
  let component: RolePermissionCreateOrEditComponent;
  let fixture: ComponentFixture<RolePermissionCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePermissionCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
