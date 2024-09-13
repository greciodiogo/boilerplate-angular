import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportingBiComponent } from './menu-reporting-bi.component';

describe('MenuReportingBiComponent', () => {
  let component: MenuReportingBiComponent;
  let fixture: ComponentFixture<MenuReportingBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReportingBiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportingBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
