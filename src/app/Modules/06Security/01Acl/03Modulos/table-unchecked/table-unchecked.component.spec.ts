import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUncheckedComponent } from './table-unchecked.component';

describe('TableUncheckedComponent', () => {
  let component: TableUncheckedComponent;
  let fixture: ComponentFixture<TableUncheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUncheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUncheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
