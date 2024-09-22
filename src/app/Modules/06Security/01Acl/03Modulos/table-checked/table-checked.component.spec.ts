import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckedComponent } from './table-checked.component';

describe('TableCheckedComponent', () => {
  let component: TableCheckedComponent;
  let fixture: ComponentFixture<TableCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
