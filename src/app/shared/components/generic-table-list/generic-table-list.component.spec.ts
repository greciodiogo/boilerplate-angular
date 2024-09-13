import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableListComponent } from './generic-table-list.component';

describe('GenericTableListComponent', () => {
  let component: GenericTableListComponent;
  let fixture: ComponentFixture<GenericTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
