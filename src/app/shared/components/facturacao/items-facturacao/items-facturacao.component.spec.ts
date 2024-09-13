import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFacturacaoComponent } from './items-facturacao.component';

describe('ItemsFacturacaoComponent', () => {
  let component: ItemsFacturacaoComponent;
  let fixture: ComponentFixture<ItemsFacturacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsFacturacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFacturacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
