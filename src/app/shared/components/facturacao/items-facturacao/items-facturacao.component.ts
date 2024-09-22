 import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { FilterFactura } from '@app/shared/models/Filters/FilterFactura';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-items-facturacao',
  templateUrl: './items-facturacao.component.html',
  styleUrls: ['./items-facturacao.component.css']
})
export class ItemsFacturacaoComponent implements OnInit {
  @Input() title: string = '';
  @Input() typeDocumentSerie: string = 'FR';
  @Input() notFound = 'Nenhuma factura encontrada';

  public pagination = new Pagination();
  public filter = new FilterFactura();
  public factura: any;

  public loading = false;

  public facturas: any = [];
  public subjectListFacts: Subject<number> = new Subject();
  public mes = moment(new Date()).format('MM');

  public status_reason: string = null;

  public loading_anular: boolean = false;
  public dashboard = {
    countRecibos: '0',
    countFacturas: '0',
    countFacturasVencidas: '0',
    countFacturasContaCorrente: '0',
  };

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public _route: Router,
    public configService: FnService,
  ) {}

  ngOnInit() {

  }

  ngOnInitHistoricoVendas() {
    this.filter.orderBy = 'created_at';
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarFacturacao(),
    });
    this.subjectObj.next(1);
  }

  public exportAsXLSX(): void {}
  public exportAsPDF(): void {
    //this.reportLoja.relatorioLoja(this.cobrancas, this.simpleForm.value, 'save');
  }

  public imprimirPDF(): void {
    //this.reportLoja.relatorioLoja(this.cobrancas, this.simpleForm.value);
  }

  /**
   * @name "Breve estatistica de facturação"
   * @descriptio "Esta Função permite Estatistica todas facturações"
   * @author "fonebahia8@gmail.com"
   * @param start
   * @param end
   */
  public dashboardFacturacao() {}

  /**
   * @name "Listar facturação"
   * @descriptio "Esta Função permite Listar todas facturações"
   * @author "fonebahia8@gmail.com"
   * @param start
   * @param end
   */
  public listarFacturacao() {}

  //--------------------------------------------------------------------------

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }
  //--------------------------------------------------------------------------

  public getFactura(factura: any) {
    this.factura = factura;
  }

  public goToPageCreateNotaCredito(factura: any) {
    this._route.navigate([
      '/comercial/facturacao/emitir-nota-credito',
      factura.id,
    ]);
  }

  public imprimirFactura(id) {
    //this.configService.imprimirFactura(id, "2ª Via", "imprimir");
  }
  public imprimirTicket(id) {}

  /**
   *
   * @param id
   */
  public showFactura(id: number) {}

  public clearSearch() {
    this.filter.search = '';
  }
}
