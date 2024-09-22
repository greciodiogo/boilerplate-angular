import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCreateOrEditComponent } from './user-form-create-or-edit.component';

describe('UserFormCreateOrEditComponent', () => {
  let component: UserFormCreateOrEditComponent;
  let fixture: ComponentFixture<UserFormCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
