import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormCreateOrEditComponent } from './role-form-create-or-edit.component';

describe('RoleFormCreateOrEditComponent', () => {
  let component: RoleFormCreateOrEditComponent;
  let fixture: ComponentFixture<RoleFormCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleFormCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFormCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
