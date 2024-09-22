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
}
@Component({
  selector: 'app-table-checked',
  templateUrl: './table-checked.component.html',
  styleUrls: ['./table-checked.component.css'],
})
export class TableCheckedComponent implements OnInit {
  @Input() idModuloAncestral;
  @Input() role: Role = new Role();
  @Input() modulo_id: number;
  @Input() noSeleccionado: noSeleccionad;
  @Output() noSeleccionadoSaida = new EventEmitter<any>();
  @Input() modulos: [];
  @Input() carregarPermissoes: any;
  @Output() public changeItem = new EventEmitter<any>();

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  public permissoesARemover: any = [];
  public permissions: any = [];
  public permissionsChecked: any = [];
  public pagination = new Pagination();
  public paginationChecked = new Pagination();
  public filterUncheck = new Filter();

  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(
    public permissionServiceChecked: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService,
    private moduloPermissaoService: ModuloPermissaoService
  ) {}

  ngOnInit(): void {}

  public listarPermissoesAssociadas(moduloIdRecebido = null) {
    this.permissionsChecked = [];
    this.permissionServiceChecked.loading = true;
    const modulo_id =
      moduloIdRecebido != null ? moduloIdRecebido : this.noSeleccionado.id;
    var httpParams = new HttpParams()
      .set('page', (this.paginationChecked.page || 1).toString())
      .set('perPage', (this.paginationChecked.perPage || 10).toString())
      .set('search', this.filterUncheck.search.toString())
      .set('orderBy', this.filterUncheck.orderBy.toString())
      .set('typeOrderBy', this.filterUncheck.typeOrderBy.toString())
      .set('typeFilter', this.filterUncheck.typeFilter.toString())
      .set('carregar_permissoes', '1')
      .set(
        'idModuloAncestral',
        this.idModuloAncestral == undefined
          ? 'NAOTEM'
          : this.idModuloAncestral.toString()
      )
      .set('modulo_id', modulo_id);
    const search = this.filterUncheck.search;

    this.permissionServiceChecked
      .listarPermissoesAssociadasAoModulo(search, httpParams)
      .subscribe(
        (data) => {
          this.permissionsChecked = data.data;
          this.paginationChecked.page = data.page;
          this.paginationChecked.perPage = data.perPage;
          this.paginationChecked.lastPage = data.lastPage;
          this.paginationChecked.total = data.total;
          this.permissionServiceChecked.loading = false;
        },
        (error) => {
          this.permissionServiceChecked.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.noSeleccionado != undefined && this.noSeleccionado.id > 0) {
      this.subjectObj.pipe(debounceTime(1000)).subscribe({
        next: () => this.listarPermissoesAssociadas(),
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
          this.listarPermissoesAssociadas();
          this.changeItem.emit(this.noSeleccionado.id);
        },
        (error) => {
          // console.log('error=>', error);
          this.permissionServiceChecked.loading = false;
        }
      );

    this.ngOnInit();
    this.noSeleccionadoSaida.emit(this.noSeleccionado);
  }

  adicionarPermissaoARemover() {
    this.permissoesARemover = $('.permissaoAssociada:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
  }

  excluirPermissao(permissao) {
    this.adicionarPermissaoARemover();
    const objectoASubmeter = {
      modulo_id: this.noSeleccionado.id,
      permissao_id: this.permissoesARemover,
      accao: 'Remover',
    };
    Swal.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja desassociar a(s) permissão(ões) que seleccionou?</b>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.attachDetachPermissionsToModulo(objectoASubmeter);
        this.listarPermissoesAssociadas();
      } else if (result.isDenied) {
        Swal.fire('Operação feita com  sucesso', '', 'info');
      }
    });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public getPageFilterDataChecked(page: number) {
    if (this.paginationChecked.perPage == null) {
      return;
    }
    this.paginationChecked.page = page;
    this.subjectObj.next(this.paginationChecked.page);
  }

  manipularTodosCheckBoxesAssociados(evento) {
    evento.target.checked
      ? $('.permissaoAssociada').prop('checked', true)
      : $('.permissaoAssociada').prop('checked', false);

    this.adicionarPermissaoARemover();
  }

  setarDados(){
    return this.permissionsChecked = []
    console.log("trunck");
    
  }
}
