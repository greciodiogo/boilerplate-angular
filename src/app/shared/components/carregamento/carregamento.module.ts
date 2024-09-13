import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarregamentoVoucherComponent } from './carregamento-voucher/carregamento-voucher.component';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarregamentoVoucherComponent],
  imports: [CommonModule, LoadingModule, FormsModule, ReactiveFormsModule],
  exports: [CarregamentoVoucherComponent],
})
export class CarregamentoModule {}
