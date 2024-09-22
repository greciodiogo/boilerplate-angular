import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAccessComponent } from './log-access.component';

describe('LogAccessComponent', () => {
  let component: LogAccessComponent;
  let fixture: ComponentFixture<LogAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
