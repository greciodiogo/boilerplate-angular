 import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { FilterFactura } from '@app/shared/models/Filters/FilterFactura';
import { FacturaService } from '@app/resources/Modules/02Comercial/01Facturacao/services/factura.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';
import { Factura } from '@app/resources/Modules/02Comercial/01Facturacao/models/Factura';
import { TermicaFacturaService } from '@app/resources/Modules/02Comercial/01Facturacao/03Reports/termica-factura.service';
import { A4FacturaService } from '@app/resources/Modules/02Comercial/01Facturacao/03Reports/a4factura.service';

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
  public factura: Factura = new Factura();

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
    public facturaService: FacturaService,
    public configService: FnService,
    public a4FacturaService: A4FacturaService,
    public termicaFacturaService: TermicaFacturaService
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
   * @author "caniggia.moreira@itgest.pt"
   * @param start
   * @param end
   */
  public dashboardFacturacao() {
    this.facturaService.dashboardList().subscribe((response) => {
      this.dashboard.countRecibos = this.configService.numberFormat(
        Object(response).countRecibos
      );
      this.dashboard.countFacturas = this.configService.numberFormat(
        Object(response).countFacturas
      );
      this.dashboard.countFacturasVencidas = this.configService.numberFormat(
        Object(response).countFacturasVencidas
      );
      this.dashboard.countFacturasContaCorrente =
        this.configService.numberFormat(
          Object(response).countFacturasContaCorrente
        );
    });
  }

  /**
   * @name "Listar facturação"
   * @descriptio "Esta Função permite Listar todas facturações"
   * @author "caniggia.moreira@itgest.pt"
   * @param start
   * @param end
   */
  public listarFacturacao() {
    this.facturas = [];
    this.facturaService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set(
        'startDate',
        moment(this.filter.startDate).format('YYYY-MM-DD').toString()
      )
      .set(
        'endDate',
        moment(this.filter.endDate).format('YYYY-MM-DD').toString()
      )
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('typeDocument', this.typeDocumentSerie);
    const search = this.filter.search;

    this.facturaService.list(search, httpParams).subscribe(
      (data) => {
        this.facturas = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
      },
      (error) => {
        this.facturaService.loading = false;
      }
    );
  }

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
  public imprimirTicket(id) {
    this.termicaFacturaService.imprimirFacturaTermica(id);
  }

  /**
   *
   * @param id
   */
  public showFactura(id: number) {
    this.facturaService.show(id).subscribe(
      (data) => {
        this.factura = data;
      },
      (error) => {
        this.facturaService.loading = false;
      }
    );
  }

  public clearSearch() {
    this.filter.search = '';
  }
}
