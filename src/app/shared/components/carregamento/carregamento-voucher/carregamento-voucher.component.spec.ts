import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregamentoVoucherComponent } from './carregamento-voucher.component';

describe('CarregamentoVoucherComponent', () => {
  let component: CarregamentoVoucherComponent;
  let fixture: ComponentFixture<CarregamentoVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregamentoVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregamentoVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
