import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowSkeletonComponent } from './table-row-skeleton.component';

describe('TableRowSkeletonComponent', () => {
  let component: TableRowSkeletonComponent;
  let fixture: ComponentFixture<TableRowSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRowSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
