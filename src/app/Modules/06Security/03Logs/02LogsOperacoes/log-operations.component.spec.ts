import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOperationsComponent } from './log-operations.component';

describe('LogOperationsComponent', () => {
  let component: LogOperationsComponent;
  let fixture: ComponentFixture<LogOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
