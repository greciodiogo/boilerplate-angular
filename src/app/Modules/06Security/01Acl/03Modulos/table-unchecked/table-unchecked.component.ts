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
import { ModuloService } from '../../services/modulos.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import * as $ from 'jquery';
import { ModuloPermissaoService } from '../../services/modulo-permissao.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface noSeleccionad {
  id: number;
  subModulos: [];
  is_principal: any;
}

@Component({
  selector: 'app-table-unchecked',
  templateUrl: './table-unchecked.component.html',
  styleUrls: ['./table-unchecked.component.css'],
})
export class TableUncheckedComponent implements OnInit {
  @Input() idModuloAncestral;
  @Input() role: Role = new Role();
  @Input() noSeleccionado: noSeleccionad;
  @Input() modulos: [];
  @Input() carregarPermissoes: any;
  @Input() carregarPermissoesNaoSelec: any;
  contChecksSelected: number;

  @Output() private noSeleccionadoSaida = new EventEmitter<any>();
  @Input() modulo_id: number;
  @Input() getById: number = 1;
  @Output() public changeItem = new EventEmitter<any>();

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  public submodulosAAdicionar: any = [];
  public permissions: any = [];
  public permissionsChecked: any = [];
  public paginationUnchecked = new Pagination();
  public filter = new Filter();

  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(
    public permissionServiceUnchecked: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService,
    private moduloPermissaoService: ModuloPermissaoService
  ) {}

  ngOnInit(): void {
    this.contChecksSelected = 0;
  }

  public listarPermissoesNaoAssociadas(moduloIdRecebido = null) {
    this.permissions = [];
    this.permissionServiceUnchecked.loading = true;
    this.idModuloAncestral =
      this.idModuloAncestral > 0 ? this.idModuloAncestral : 0;
    const modulo_id =
      moduloIdRecebido != null ? moduloIdRecebido : this.noSeleccionado.id;
    var httpParams = new HttpParams()
      .set('page', (this.paginationUnchecked.page || 1).toString())
      .set('perPage', (this.paginationUnchecked.perPage || 10).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('carregar_permissoes', '0') //(this.noSeleccionado.is_principal) ? "0" : "2"
      .set('idModuloAncestral', this.idModuloAncestral.toString())
      .set('modulo_id', modulo_id);
    const search = this.filter.search;

    this.permissionServiceUnchecked.list(search, httpParams).subscribe(
      (data) => {
        this.permissions = data.data;
        this.paginationUnchecked.page = data.page;
        this.paginationUnchecked.perPage = data.perPage;
        this.paginationUnchecked.lastPage = data.lastPage;
        this.paginationUnchecked.total = data.total;
      },
      (error) => {
        this.permissionServiceUnchecked.loading = false;
      }
    );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.noSeleccionado != undefined && this.noSeleccionado.id > 0) {
      this.subjectObj.pipe(debounceTime(1000)).subscribe({
        next: () => this.listarPermissoesNaoAssociadas(),
      });
      this.subjectObj.next(1);
    }
  }

  attachDetachPermissionsToModulo(data) {
    this.moduloPermissaoService
      .attachDetachPermissionsToModulo(data)
      .pipe(first())
      .subscribe(
        (response) => {
          this.listarPermissoesNaoAssociadas();
          this.changeItem.emit(this.noSeleccionado.id);
        },
        (error) => {
          // console.log('error=>', error);
          this.permissionServiceUnchecked.loading = false;
        }
      );

    this.ngOnInit();
    this.noSeleccionadoSaida.emit(this.noSeleccionado);
  }

  pegarPermissoesSeleccionadas() {
    this.submodulosAAdicionar = $('.permissaoNaoAssociada:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
  }

  adicionarPermissoesSeleccionadas() {
    this.pegarPermissoesSeleccionadas();

    const objectoASubmeter = {
      modulo_id: this.noSeleccionado.id,
      permissao_id: this.submodulosAAdicionar,
      accao: 'Adicionar',
    };

    this.attachDetachPermissionsToModulo(objectoASubmeter);
    // this.listarPermissoesNaoAssociadas();
  }

  public getPageFilterData(page: number) {
    if (this.paginationUnchecked.perPage == null) {
      return;
    }
    this.paginationUnchecked.page = page;
    this.subjectObj.next(this.paginationUnchecked.page);
  }

  public getPageFilterDataUnchecked(page: number) {
    if (this.paginationUnchecked.perPage == null) {
      return;
    }
    this.paginationUnchecked.page = page;
    this.subjectObj.next(this.paginationUnchecked.page);
  }

  manipularTodosCheckBoxes(evento) {
    if (evento.target.checked) {
      this.contChecksSelected = 1;
      $('.permissaoNaoAssociada').prop('checked', true);
    } else {
      this.contChecksSelected = 0;
      $('.permissaoNaoAssociada').prop('checked', false);
    }
  }

  setarDados(){
    return this.permissionsChecked = [];
    console.log("Untrunck");
    
  }
}
