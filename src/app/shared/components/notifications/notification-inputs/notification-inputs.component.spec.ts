import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationInputsComponent } from './notification-inputs.component';

describe('NotificationInputsComponent', () => {
  let component: NotificationInputsComponent;
  let fixture: ComponentFixture<NotificationInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
