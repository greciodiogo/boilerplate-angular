import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { ModuloService } from '@app/Modules/06Security/01Acl/services/modulos.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';
import { Permission } from '../../models/Permission';
import { Modulo } from '../../models/Modulo';
import { PermissionService } from '@app/Modules/06Security/01Acl/services/permission.service';
import { Role } from '../../models/Role';
import { FormGroup } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { FormService } from '@app/shared/services/form.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ModuloSubMouloService } from '../../services/modulo-submodulo.service';

@Component({
  selector: 'app-associar-modulos-submodulos',
  templateUrl: './associar-modulos-submodulos.component.html',
  styleUrls: ['./associar-modulos-submodulos.component.css'],
})
export class AssociarModulosSubmodulosComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new Filter();
  public modulo = new Modulo();
  public role = new Role();
  public modulos: any = [];
  public subModulos: any = [];
  submodulosAAdicionar: any = [];
  submodulosAExclur: any = [];
  public subModulosNaoSeleccionados: any = [];
  public permission: Permission = new Permission();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  @Input() simpleFormRole: FormGroup;
  submitted = false;
  moduloSeleccionado;

  //Não selecccionados
  public paginationUnchecked = new Pagination();

  constructor(
    public permissionService: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService,
    public roleService: RoleService,
    public formService: FormService,
    private moduloSubMouloService: ModuloSubMouloService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarModulos(),
    });
    this.subjectObj.next(1);
    this.modulo = null;
  }

  async listarModulos() {
    this.formService.getModulos().subscribe((response) => {
      this.modulos = response;
      // console.log("this.modulos:" + JSON.stringify(this.modulos));
    });
  }

  listarTodosSubModulos() {
    this.listarSubModulosNaoAsssocAoModulo();
    this.listarSubModulosPorModulo();
  }

  async listarSubModulosPorModulo() {
    this.formService
      .getSubModulosByModulosId(this.moduloSeleccionado.id)
      .subscribe((response) => {
        this.subModulos = response;
        // console.log("this.subModulos:" + JSON.stringify(this.subModulos))
      });
  }

  async listarSubModulosNaoAsssocAoModulo() {
    this.formService
      .getSubModulosNaoAssociAoModulo(this.moduloSeleccionado.id)
      .subscribe((response) => {
        this.subModulosNaoSeleccionados = response;
        // console.log("subModulosNaoSeleccionados:" + JSON.stringify(this.subModulosNaoSeleccionados))
      });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  pegarModulo(modulo, elemento) {
    this.moduloSeleccionado = modulo;
    // console.log("this.moduloSeleccionado:" + JSON.stringify(this.moduloSeleccionado))
    this.listarTodosSubModulos();
    $('.tree_label').removeClass('clicado');
    $(elemento).addClass('clicado');
  }

  manipularTodosCheckBoxes(evento) {
    this.isAllSelected()
      ? $('input[type=checkbox]').prop('checked', false)
      : $('input[type=checkbox]').prop('checked', true);
  }

  async adicionarSubModulos() {
    this.submodulosAAdicionar = [];
    this.submodulosAAdicionar = $('.subModuloAAdicionar:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();

    const objectoASubmeter = {
      modulo_id: this.moduloSeleccionado.id,
      submodulo_id: this.submodulosAAdicionar,
      accao: 'Adicionar',
    };

    await this.attachDetachSubModulosToModulo(objectoASubmeter);
    this.moduloService.loading = false;
    this.listarTodosSubModulos();
  }

  excluirSubModulos() {
    this.submodulosAExclur = [];
    this.submodulosAExclur = $('.submoduloAExcluir:checkbox:not(:checked)')
      .map(function () {
        return $(this).val();
      })
      .get();

    this.excluirPermissao();
    this.moduloService.loading = false;
    this.listarTodosSubModulos();
  }

  isAllSelected() {
    let contChecksSelected = 0;
    var seleccionados = document.querySelectorAll('.permissao');
    Array.prototype.forEach.call(seleccionados, function (item) {
      if (item.checked) {
        contChecksSelected++;
      }
    });
    return contChecksSelected === this.pagination.perPage;
  }

  // Não seeccionados
  public getPageFilterDataUnchecked(page: number) {
    if (this.paginationUnchecked.perPage == null) {
      return;
    }
    this.paginationUnchecked.page = page;
    this.subjectObj.next(this.paginationUnchecked.page);
  }

  excluirPermissao() {
    const objectoASubmeter = {
      modulo_id: this.moduloSeleccionado.id,
      submodulo_id: this.submodulosAExclur,
      accao: 'Remover',
    };
    Swal.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja desassociar os submósulos não seleccionados`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.attachDetachSubModulosToModulo(objectoASubmeter);
      } else if (result.isDenied) {
        Swal.fire('Operação feita com  sucesso', '', 'info');
      }
    });
  }

  attachDetachSubModulosToModulo(data) {
    this.moduloSubMouloService
      .attachDetachSubModuloToModulo(data)
      .pipe(first())
      .subscribe(
        (response) => {
          // console.log("Sucesso");
          this.listarTodosSubModulos();
        },
        (error) => {
          // console.log('error=>', error);
          this.moduloService.loading = false;
        }
      );

    this.ngOnInit();
  }
}
