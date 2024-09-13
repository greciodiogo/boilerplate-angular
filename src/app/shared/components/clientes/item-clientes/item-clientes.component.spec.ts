import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClientesComponent } from './item-clientes.component';

describe('ItemClientesComponent', () => {
  let component: ItemClientesComponent;
  let fixture: ComponentFixture<ItemClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
