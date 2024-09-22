import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListarComponent } from './role-listar.component';

describe('RoleListarComponent', () => {
  let component: RoleListarComponent;
  let fixture: ComponentFixture<RoleListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
