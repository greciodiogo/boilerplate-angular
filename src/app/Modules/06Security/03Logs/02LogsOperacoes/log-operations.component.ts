import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '@app/shared/models/pagination';
import { LogsService } from '../services/logs.service';
import { PDFRelatorioLogsOperacoes } from '../services/report-logs-operacoes.service';
import { FormService } from '@app/shared/services/form.service';
import { ExportExcelService } from '@app/shared/services/exports/excel/export-excel.service';
import * as moment from 'moment';
import { Role } from '../../01Acl/models/Role';

@Component({
  selector: 'app-log-operations',
  templateUrl: './log-operations.component.html',
  styleUrls: ['./log-operations.component.css'],
})
export class LogOperationsComponent implements OnInit {
  public eventos = [
    {id: 1, name:"CREATE"},
    {id: 2, name:"LOGIN"},
    {id: 3, name:"UPDATE"},
    {id: 4, name:"DELETE"},
  ]
  public pagination = new Pagination();
  public filter = new Filter();
  public logs: any = [];
  public logs_test: any = [];

  public _old: any = [];
  public _new: any = [];
  
  
  public loading = false;

  public users: any = [];

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  public typeUtilizador = ""
  public typeEvento = ""
  public auditavel = ""

  infoCompany: any
  constructor(
    public _route: Router,
    public logsService: LogsService,
    public configService: FnService,
    public formService: FormService,
    public exportExcelService: ExportExcelService, 
    public pdfRelatorioLogsOperacoes: PDFRelatorioLogsOperacoes,
  ){}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarLogsOperations(),
    });
    this.subjectObj.next(1);
    
    this.getUsers();
  }

  public listarLogsOperations() {
    this.logsService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('typeUtilizador', this.typeUtilizador.toString())
      // .set('auditavel', this.auditavel.toString())
      .set('typeEvento', this.typeEvento.toString());
    const search = this.filter.search;

    this.logsService.getLogsOperation(search, httpParams).subscribe(
      (data) => {
        this.logs = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
        this.logsService.loading = false;
      },
      (error) => {
        this.logsService.loading = false;
      }
    );
  }

  public resevUtilizador = ""
  public resevEvento = ""
  // public resevAuditavel = ""

  public setFiltros(){
    this.resevUtilizador = this.typeUtilizador
    this.resevEvento = this.typeEvento
    // this.resevAuditavel = this.auditavel

     var contUtilizador = this.users.find(x => x.id == this.typeUtilizador)
     var contEvento = this.eventos.find(x => x.name == this.typeEvento)

     this.typeUtilizador = contUtilizador != undefined ? contUtilizador?.name : "Todos"
     this.typeEvento = contEvento != undefined ? contEvento?.name : "Todos"
    }

    exportAsXLSX(): void {
      this.setFiltros()

      const newFilter = {
        search: this.filter.search,
        utilizador: this.typeUtilizador,
        evento: this.typeEvento,
        // auditavel: this.auditavel
      }
  
     var filtros = this.formService.getFilterExcel(newFilter);
  
      //  { province: this.resevEvento, direccao: this.resevAuditavel, forma_pagamento: this.resevUtilizador});
  
       var movimentosExcel = JSON.parse(JSON.stringify(this.logs));
      
       for (let i = 0; i < movimentosExcel?.length; i++) {
        movimentosExcel[i].success =
        movimentosExcel[i]?.success == 1 ? 'Sucesso' : 'Falha';
      }
      
      var CurrentDate = new Date();
      var keys = [
        { key: 'id', width: 20 },
        { key: 'utilizador', width: 60 },
        { key: 'event', width: 25 },
        { key: 'auditable_id', width: 25 },
        { key: 'auditable', width: 25 },
        { key: 'ip', width: 25 },
        { key: 'message', width: 25 },
        { key: 'success', width: 25 },
        { key: 'url', width: 25 },
        { key: 'create_at', width: 25 },
        { key: 'updated_at', width: 25 },
      ];
  
        var Cols = [
          'ID',
          'Utilizador',
          'Evento',
          'ID Auditável	',
          'Auditável',
          'IP',
          'Mensagem',
          'Estado',
          'URL',
          'Data de Criação',
          'Data de Actualização',
        ];
      
  
      var title = 'RELATÓRIO DE LOGS DE OPERCAÇÕES';
      var nameFile = title + ' -';
      moment(CurrentDate).format('DD') +
        '-' +
        moment(CurrentDate).format('MM') +
        '-' +
        moment(CurrentDate).format('YYYY') +
        ' ' +
        moment(CurrentDate).format('H') +
        ':' +
        moment(CurrentDate).format('m');  
      this.exportExcelService.excels(
        movimentosExcel,
        nameFile,
        keys,
        Cols,
        title,
        15,
        11,
        40,
        3,
        [1],
        false,
        filtros
      );
    }

  public async exportAsPDF() {
  this.setFiltros()
  const newFilter = {
    search: this.filter.search,
    orderBy: this.filter.orderBy,
    utilizador: this.typeUtilizador,
    evento: this.typeEvento,
    // auditavel: this.auditavel
  }

 var filtros = this.formService.getFilterExcel(newFilter);

    this.getCompanyLogo()
    var prints = [];
    prints.push(
      await this.pdfRelatorioLogsOperacoes.imprimirPDFRelatorioLogsOperacoes(
        this.logs,
        filtros,
        "logs-operacoes",
        this.infoCompany,
        'buffer'
      )
    );
  
    const pdfUrl = await this.configService.mergePdfBuffers(prints);
    window.open(pdfUrl, '_blank');
  }

  public getCompanyLogo() {
    this.infoCompany =
      localStorage.getItem('accessToken') == null
        ? []
        : JSON.parse(localStorage.getItem('accessToken'));
  }
  //--------------------------------------------------------------------------

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public cleanString(str) {
    if (str !== null) {
      return JSON.parse(str);
    }
  }

  setElementLogs(log: any) {
    this.logs = log;
    if (this.logs?.new_data !== null) {
      this._new = this.cleanString(this.logs?.new_data);
      this._old = this.cleanString(this.logs?.old_data);
      this.logs_test = this.configService.diffDataJson(this._new, this._old);
      //console.log(this.logs);
    }
  }

  public getUsers() {
    this.formService
      .getUsers()
      .pipe(finalize(() => {this.loading = false; }) )
      .subscribe(
        (response) => {
          this.users = response; 
        },
        (error) => {
          this.loading = false;
        }
      );
  }  
}
