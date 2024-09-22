import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfResetPasswordComponent } from './self-reset-password.component';

describe('SelfResetPasswordComponent', () => {
  let component: SelfResetPasswordComponent;
  let fixture: ComponentFixture<SelfResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
