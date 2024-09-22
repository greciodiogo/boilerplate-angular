import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesCreateOrEditComponent } from './user-roles-create-or-edit.component';

describe('UserRolesCreateOrEditComponent', () => {
  let component: UserRolesCreateOrEditComponent;
  let fixture: ComponentFixture<UserRolesCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
