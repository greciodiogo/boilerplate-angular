import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFieldListComponent } from './permission-field-list.component';

describe('PermissionFieldListComponent', () => {
  let component: PermissionFieldListComponent;
  let fixture: ComponentFixture<PermissionFieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionFieldListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
