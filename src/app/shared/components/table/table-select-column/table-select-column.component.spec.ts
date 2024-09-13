import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectColumnComponent } from './table-select-column.component';

describe('TableSelectColumnComponent', () => {
  let component: TableSelectColumnComponent;
  let fixture: ComponentFixture<TableSelectColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSelectColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSelectColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
