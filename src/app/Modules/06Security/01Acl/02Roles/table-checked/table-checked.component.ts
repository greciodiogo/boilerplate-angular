import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionService } from '@app/Modules/06Security/01Acl/services/permission.service';
import { Filter } from '@app/shared/models/Filters/Filter';
import { Pagination } from '@app/shared/models/pagination';
import { Observable, Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { FnService } from '@app/shared/services/fn.helper.service';
import { FormService } from '@app/shared/services/form.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-table-checked',
  templateUrl: './table-checked.component.html',
  styleUrls: ['./table-checked.component.css'],
})
export class TableCheckedComponent implements OnInit {
  @Input() role: Role = new Role();

  @Output() private selectedData = new EventEmitter<any>();

  @Input() getById: number = 1;
  @Input() modulo_id: number;

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  public permissions: any = [];
  permissionsUnchecked: any = [];
  public pagination = new Pagination();
  public paginationUnchecked = new Pagination();
  public filter = new Filter();
  public filterNaoAssociadas = new Filter();

  contChecksSelected;

  constructor(
    public permissionService: PermissionService,
    public configService: FnService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.contChecksSelected = 0;
  }

  pesquisarSelecionadas() {
    // console.log("this.filte.search:"+this.filter.search)
    this.listarPermissoesAssociadas();
  }

  pesquisarNaoSelecionadas() {
    // console.log("this.filterNaoAssociadas.search:"+this.filterNaoAssociadas.search)
    this.listarPermissoesNaoAssociadas();
  }

  public listarPermissoes() {
    this.listarPermissoesAssociadas();
    this.listarPermissoesNaoAssociadas();
  }

  public listarPermissoesAssociadas() {
    this.permissions = [];
    this.permissionService.loading = true;
    var httpParams = new HttpParams()
      .set('pageAssociated', (this.pagination.page || 1).toString())
      .set('perPageAssociated', (this.pagination.perPage || 10).toString())
      .set(
        'searchAssociated',
        this.filter.search.length > 0
          ? this.filter.search
          : this.filterNaoAssociadas.search
      )
      .set('orderByAssociated', this.filter.orderBy.toString())
      .set('typeOrderByAssociated', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('modulo_id', this.modulo_id.toString())
      .set('role_id', this.role.id.toString());
    const search =
      this.filter.search.length > 0
        ? this.filter.search
        : this.filterNaoAssociadas.search;

    this.permissionService.listarAssociadasARole(search, httpParams).subscribe(
      (data) => {
        this.permissions = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
      },
      (error) => {
        this.permissionService.loading = false;
      }
    );
  }

  public listarPermissoesNaoAssociadas() {
    this.permissionsUnchecked = [];
    this.permissionService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.paginationUnchecked.page || 1).toString())
      .set('perPage', (this.paginationUnchecked.perPage || 10).toString())
      .set('search', this.filterNaoAssociadas.search)
      .set('orderBy', this.filterNaoAssociadas.orderBy.toString())
      .set('typeOrderBy', this.filterNaoAssociadas.typeOrderBy.toString())
      .set('typeFilter', this.filterNaoAssociadas.typeFilter.toString())
      .set('modulo_id', this.modulo_id.toString())
      .set('role_id', this.role.id.toString());
    const search = this.filterNaoAssociadas.search;
    // console.log("this.search:"+search)

    this.permissionService
      .listarNaoAssociadasARole(search, httpParams)
      .subscribe(
        (data) => {
          this.permissionsUnchecked = data.data;
          this.paginationUnchecked.page = data.page;
          this.paginationUnchecked.perPage = data.perPage;
          this.paginationUnchecked.lastPage = data.lastPage;
          this.paginationUnchecked.total = data.total;
        },
        (error) => {
          this.permissionService.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.role?.id && this.modulo_id > 0) {
      this.subjectObj.pipe(debounceTime(1000)).subscribe({
        next: () => this.listarPermissoes(),
      });
      this.subjectObj.next(1);
    }
  }

  attachDetachPermissionsToRole(data) {
    this.permissionService
      .attachDetachPermissionsToRole(data)
      .pipe(first())
      .subscribe(
        (response) => {
          this.permissionService.loading = true;
        },
        (error) => {
          // console.log('error=>', error);
          this.permissionService.loading = false;
        }
      );
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public getPageFilterDataUnchecked(page: number) {
    if (this.paginationUnchecked.perPage == null) {
      return;
    }
    this.paginationUnchecked.page = page;
    this.subjectObj.next(this.paginationUnchecked.page);
  }

  adicionarPermissao(evento) {
    if (evento.target.checked) {
      this.contChecksSelected++;
    } else {
      let submodulosAAdicionar = [];
      submodulosAAdicionar = $('.permissao:checkbox:checked')
        .map(function () {
          return $(this).val();
        })
        .get();
      this.contChecksSelected =
        submodulosAAdicionar.length == 0 ? 0 : this.contChecksSelected;
    }
  }

  adicionarPermissoesSeleccionadas() {
    let submodulosAAdicionar = [];
    submodulosAAdicionar = $('.permissao:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();

    let data = { role_id: this.role.id };
    let atachPermission = {
      ...data,
      attachPermission: [submodulosAAdicionar],
      detachPermission: [],
      accao: 'Adicionar',
    };

    this.attachDetachPermissionsToRole(atachPermission);
    this.ngOnChanges(null);
    // this.listarPermissoes();
  }

  removerPermissoes(permisao) {
    const objectoASubmeter = {
      modulo_id: this.modulo_id,
      permissao_id: permisao.id,
      accao: 'Remover',
    };

    let data = { role_id: this.role.id };
    let detachPermission = {
      ...data,
      detachPermission: [permisao.id],
      attachPermission: [],
      accao: 'Remover',
    };
    this.attachDetachPermissionsToRole(detachPermission);
    this.ngOnChanges(null);
    // this.listarPermissoes();
  }

  manipularTodosCheckBoxes(evento) {
    if (evento.target.checked) {
      this.contChecksSelected = 1;
      $('input[type=checkbox]').prop('checked', true);
    } else {
      this.contChecksSelected = 0;
      $('input[type=checkbox]').prop('checked', false);
    }
  }
}
