import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionListarComponent } from './permission-listar.component';

describe('PermissionListarComponent', () => {
  let component: PermissionListarComponent;
  let fixture: ComponentFixture<PermissionListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
