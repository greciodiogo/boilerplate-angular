import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  ViewChild,
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
import { ArvoreModel } from '@app/Modules/06Security/01Acl/03Modulos/ArvoreModel';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-associar-permissoes-perfis',
  templateUrl: './associar-permissoes-perfis.component.html',
  styleUrls: ['./associar-permissoes-perfis.component.css'],
})
export class AssociarPermissoesPerfisComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new Filter();
  public modulo = new Modulo();
  public role = new Role();
  public modulos: any = [];
  permissoesPorPerfilJaExistentes: any = [];
  modulosPorPerfilJaExistentes: any = [];
  roles: any = [];
  public subModulos: any = [];
  operacoesDoSubModulo: any = [];
  public permission: Permission = new Permission();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  @Input() is_modal: boolean = false;
  @Input() simpleFormRole: FormGroup;
  noSeleccionado;
  submitted = false;
  modulo_id: number;
  role_id: number;
  modulosAExcluir: any = [];
  modulosAAdicionar: any = [];
  modulosAActualizar: any = [];
  moduloSubModulosAExcluir: any = [];
  moduloSubModulosAAdicionar: any = [];
  moduloSubModulosAActualizar: any = [];
  modulosActuaisSeleccionadosAux: any = [];
  modulosActuaisIdModulosSeleccionados: any = [];
  modulosSubModulosActuaisSeleccionados: any = [];
  permissoesAExcluir: any = [];
  permissoesAAdicionar: any = [];
  opcoesModo = [
    { valor: 'W', texto: 'Escrita' },
    { valor: 'R', texto: 'Leitura' },
  ];

  opcoesCRUD = [
    { nome: 'Criar', sigla: 'C', siglaPT: 'C', modo: 'W' },
    { nome: 'Listar', sigla: 'R', siglaPT: 'L', modo: 'R' },
    { nome: 'Actualizar', sigla: 'U', siglaPT: 'A', modo: 'W' },
    { nome: 'Apagar', sigla: 'D', siglaPT: 'D', modo: 'W' },
    { nome: 'Executar', sigla: 'E', siglaPT: 'E', modo: 'WR' },
  ];

  public list: ArvoreModel[];
  desactivarBotaoSalvar: boolean = true;

  constructor(
    public permissionService: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService,
    public roleService: RoleService,
    public formService: FormService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarModulos(),
    });
    this.subjectObj.next(1);
    this.modulo = null;
    this.getRoles();
  }

  onReset() {
    this.role = new Role();
    this.submitted = false;
    this.simpleFormRole?.reset();
  }

  async listarModulos() {
    this.moduloService.loading = true;
    this.formService.getModulosESubModulos().subscribe((response) => {
      this.modulos = response;
      this.list = this.modulos;
      this.moduloService.loading = false;
    });
  }

  canActivateRouterLink(p) {
    return true;
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  setModulo(modulo: Modulo) {
    this.modulo = modulo;
  }

  public delete(id: number) {
    this.permissionService.delete(id).subscribe((error) => {
      this.permissionService.loading = false;
    });
  }

  onSubmit() {}

  pegarModulo(modulo, elemento: any = '') {
    if (modulo.is_principal) this.modulo_id = modulo.id;

    this.noSeleccionado = modulo;
    this.modulo = modulo;
  }

  async getOperacoesDoSubModulo(subModulo_id) {
    this.moduloService.loading = true;
    this.formService
      .getPermissoesPorModuloSemEstarNoutro(subModulo_id)
      .subscribe((response) => {
        this.operacoesDoSubModulo = response;
        this.moduloService.loading = false;
      });
  }

  trocarEstadoDosElementosInternos(idElementoEmCausa, estado) {
    var li = $('#' + idElementoEmCausa)
      .parent()
      .parent();

    $(li)
      .find('ol li .operacoes')
      .each(function () {
        $(this).prop('checked', estado);
      });

    $(li)
      .find('ul li label .modulos')
      .each(function () {
        $(this).prop('checked', estado);
      });
  }

  trocarEstadoDosElementosAncestrais(idElementoEmCausa, estado, modulo = null) {
    var liAncestral = $('#' + idElementoEmCausa)
      .parent()
      .parent()
      .parent()
      .parent();
    while ($(liAncestral).attr('id') != undefined) {
      $(liAncestral)
        .find('label .' + $(liAncestral).attr('id'))
        .each(function () {
          $(this).prop('checked', estado);
          liAncestral = $(liAncestral).parent().parent();
        });
    }
  }

  trocarEstadoDosElementosAncestraisOperacao(
    idElementoEmCausa,
    estado,
    modulo = null
  ) {
    var liAncestral = $('#' + idElementoEmCausa)
      .parent()
      .parent()
      .parent();
    while ($(liAncestral).attr('id') != undefined) {
      $(liAncestral)
        .find('label .' + $(liAncestral).attr('id'))
        .each(function () {
          $(this).prop('checked', estado);
          liAncestral = $(liAncestral).parent().parent();
        });
    }
  }

  verificarModuloSubModuloJaAssociado(evento, modulo) {
    if (modulo.is_principal || !evento.target.checked) return true;

    let modulosActuaisSeleccionads = $('.modulos:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();

    modulosActuaisSeleccionads = modulosActuaisSeleccionads.map((i) =>
      Number(i)
    );

    const modulosEmCausaExiste = modulosActuaisSeleccionads.filter(
      (cada) => cada == modulo.id
    );
    if (modulosEmCausaExiste.length > 1) {
      Swal.fire({
        title:
          'O submódulo já está associado ao perfil, tem certeza que deseja adicionar mesmo assim?',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          $('#' + evento.target.id).prop('checked', false);
          this.trocarEstadoDosElementosInternos(evento.target.id, false);
          return false;
        }
      });
    }

    return false;
  }

  diferencaEntreArraysPermissoes(arrayDiminuendo, arraydiminuidor) {
    // return arrayDiminuendo.filter(({ modulo_permissao_id: id1 }) => !arraydiminuidor.some(({ modulo_permissao_id: id2 }) => id2 === id1));
    return arrayDiminuendo.filter(
      ({ permission_id: id1 }) =>
        !arraydiminuidor.some(({ permission_id: id2 }) => id2 === id1)
    );
  }

  public manipularModuloSubModulo(evento, modulo) {
    this.trocarEstadoDosElementosInternos(
      evento.target.id,
      evento.target.checked ? true : false
    );
    if (evento.target.checked) {
      this.trocarEstadoDosElementosAncestrais(
        evento.target.id,
        evento.target.checked ? true : false,
        modulo
      );
    }

    this.verificarModuloSubModuloJaAssociado(evento, modulo);

    this.pegarModulosPermissoesAoPerfil();
  }

  public manipularOperacao(idModulo, evento) {
    if (evento.target.checked) {
      this.trocarEstadoDosElementosAncestraisOperacao(
        evento.target.id,
        evento.target.checked ? true : false
      );
    } else {
      const permissoesDoModulo = $('.' + idModulo + ':checkbox:checked')
        .map(function () {
          return $(this).val();
        })
        .get();

      if (permissoesDoModulo.length == 1) {
        $('#' + idModulo)
          .find('label .' + idModulo)
          .prop('checked', false);
      } else if (permissoesDoModulo.length == 0) {
        $('#' + idModulo)
          .find('label .' + idModulo)
          .prop('checked', false);
      }
    }
    this.pegarModulosPermissoesAoPerfil();
  }

  eliminarObjectoRepetido(array) {
    // return array.filter((v, i, a) => a.findIndex(t => (t.modulo_permissao_id === v.modulo_permissao_id && t.permission_id === v.permission_id)) === i)
    return array.filter(
      (v, i, a) => a.findIndex((t) => t.permission_id === v.permission_id) === i
    );
  }

  pegarModulosPermissoesAoPerfil() {
    // this.permissoesPorPerfilJaExistentes = this.permissoesPorPerfilJaExistentes.sort(function (a:number, b:number) {  return a - b;  });

    let permissoesActuaisSeleccionadas = $('.operacoes:checkbox:checked')
      .map(function () {
        return {
          permission_id: parseInt($(this).val().toString().split('#')[0]),
          modulo_permissao_id: parseInt($(this).val().toString().split('#')[1]),
        };
      })
      .get();

    this.permissoesAExcluir = this.diferencaEntreArraysPermissoes(
      this.permissoesPorPerfilJaExistentes,
      permissoesActuaisSeleccionadas
    ); //this.permissoesPorPerfilJaExistentes.filter(x => !permissoesActuaisSeleccionadas.includes(x))

    this.permissoesAAdicionar = this.diferencaEntreArraysPermissoes(
      permissoesActuaisSeleccionadas,
      this.permissoesPorPerfilJaExistentes
    ); // permissoesActuaisSeleccionadas.filter(x => !this.permissoesPorPerfilJaExistentes.includes(x))

    this.permissoesAExcluir = this.eliminarObjectoRepetido(
      this.permissoesAExcluir
    );

    this.permissoesAAdicionar = this.eliminarObjectoRepetido(
      this.permissoesAAdicionar
    );

    // this.atribuirParaModuloSubModulo();

    const objectoASubemeter = {
      permissoesPorPerfilJaExistentes: this.permissoesPorPerfilJaExistentes,
      permissoesActuaisSeleccionadas: permissoesActuaisSeleccionadas,
      permissoesAExcluir: this.permissoesAExcluir,
      permissoesAAdicionar: this.permissoesAAdicionar,
      // modulosActuaisSeleccionados: this.modulosActuaisSeleccionadosAux,
      // modulosPorPerfilJaExistentes: this.modulosPorPerfilJaExistentes,
      modulosAExcluir: this.modulosAExcluir,
      modulosAAdicionar: this.modulosAAdicionar,
      // modulosAActualizar: this.modulosAActualizar,
      moduloSubModulosAAdicionar: this.moduloSubModulosAAdicionar,
      moduloSubModulosAExcluir: this.moduloSubModulosAExcluir,
      // modulosSubModulosActuaisSeleccionados: this.modulosSubModulosActuaisSeleccionados,
      role_id: this.role_id,
    };

    this.verificarMudancas();

    return objectoASubemeter;
  }

  verificarMudancas() {
    if (
      this.modulosAExcluir.length == 0 &&
      this.modulosAAdicionar.length == 0 &&
      this.permissoesAExcluir.length == 0 &&
      this.permissoesAAdicionar.length == 0
    ) {
      this.desactivarBotaoSalvar = true;
    } else this.desactivarBotaoSalvar = false;
  }

  esvaziarDadosCarregadosAnteriores() {
    this.modulosAExcluir = 0;
    this.modulosAAdicionar = 0;
    this.permissoesAExcluir = 0;
    this.permissoesAAdicionar = 0;
  }

  atribuirParaModuloSubModulo() {
    const modulosActuaisSeleccionados = $('.modulos:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();

    this.modulosActuaisSeleccionadosAux = modulosActuaisSeleccionados.filter(
      function (ele: any, pos) {
        return modulosActuaisSeleccionados.indexOf(ele) == pos;
      }
    );

    this.modulosActuaisSeleccionadosAux =
      this.modulosActuaisSeleccionadosAux.map((i) => Number(i));

    const modulosPorPerfilJaExistentesModulos =
      this.modulosPorPerfilJaExistentes.map(function (m) {
        return m.modulo_id;
      });

    const modulosActuaisSeleccionados2 = this.modulosActuaisSeleccionadosAux;
    this.modulosSubModulosActuaisSeleccionados = $('.modulo_submodulo_id')
      .map(function () {
        return modulosActuaisSeleccionados2.indexOf(
          parseInt($(this).attr('id'))
        ) > -1
          ? $(this).val()
          : 0;
      })
      .get();

    this.modulosSubModulosActuaisSeleccionados =
      this.modulosSubModulosActuaisSeleccionados.filter((cada) => cada > 0);

    const modulosSubModulosActuaisSeleccionadosAux =
      this.modulosSubModulosActuaisSeleccionados;
    this.modulosSubModulosActuaisSeleccionados =
      modulosSubModulosActuaisSeleccionadosAux.filter(function (ele: any, pos) {
        return modulosSubModulosActuaisSeleccionadosAux.indexOf(ele) == pos;
      });

    this.modulosSubModulosActuaisSeleccionados =
      this.modulosSubModulosActuaisSeleccionados.map((i) => Number(i));

    this.modulosActuaisIdModulosSeleccionados = $(
      '.modulo_principal_id:checkbox:checked'
    )
      .map(function () {
        return $(this).val();
      })
      .get();

    this.modulosActuaisIdModulosSeleccionados = <any>(
      this.modulosActuaisIdModulosSeleccionados.map((i) => Number(i))
    );

    this.modulosActuaisIdModulosSeleccionados =
      this.modulosActuaisIdModulosSeleccionados.filter((cada) => cada > 0);

    const modulosActuaisIdModulosSeleccionadosAux =
      this.modulosActuaisIdModulosSeleccionados;
    this.modulosActuaisIdModulosSeleccionados =
      modulosActuaisIdModulosSeleccionadosAux.filter(function (ele: any, pos) {
        return modulosActuaisIdModulosSeleccionadosAux.indexOf(ele) == pos;
      });

    // para modulosubmodulo
    let modulosPorPerfilJaExistentesSubModulos =
      this.modulosPorPerfilJaExistentes.map(function (m) {
        return m.modulo_submodulo_id;
      });

    modulosPorPerfilJaExistentesSubModulos =
      modulosPorPerfilJaExistentesSubModulos.map((i) => Number(i));

    modulosPorPerfilJaExistentesSubModulos =
      modulosPorPerfilJaExistentesSubModulos.filter((cada) => cada > 0);

    this.moduloSubModulosAExcluir =
      modulosPorPerfilJaExistentesSubModulos.filter(
        (x) => !this.modulosSubModulosActuaisSeleccionados.includes(x)
      );

    this.moduloSubModulosAAdicionar =
      this.modulosSubModulosActuaisSeleccionados.filter(
        (x) => !modulosPorPerfilJaExistentesSubModulos.includes(x)
      );

    // para modulos

    // this.modulosActuaisSeleccionadosAux = this.modulosActuaisSeleccionadosAux.filter(x => !this.modulosActuaisSeleccionadosAux.includes(x))

    this.modulosAExcluir = modulosPorPerfilJaExistentesModulos.filter(
      (x) => !this.modulosActuaisIdModulosSeleccionados.includes(x)
    );
    this.modulosAExcluir = this.modulosAExcluir.filter((x) => x != null);

    this.modulosAAdicionar = this.modulosActuaisIdModulosSeleccionados.filter(
      (x) => !modulosPorPerfilJaExistentesModulos.includes(x)
    );

    // modulosSubModulosActuaisSeleccionados.forEach(cada => {
    //   const res = this.modulosPorPerfilJaExistentes.find(x => x.modulo_id == cada.modulo_id && cada.modulo_submodulo_id > 0)
    //   if (res != null && res != undefined) {
    //     modulosAActualizar.push({ modulo_id: cada.modulo_id, modulo_submodulo_id: cada.modulo_submodulo_id, modulo_submodulo_id_antigo: res.modulo_submodulo_id })
    //   }
    // });
  }

  eliminarModuloSubModuloRepetido(array) {
    var reduced = [];

    array.forEach((item) => {
      var duplicated =
        reduced.findIndex((redItem) => {
          return item.modulo_submodulo_id == redItem.modulo_submodulo_id;
        }) > -1;

      if (!duplicated) {
        reduced.push(item);
      }
    });

    return reduced;
  }

  async associarModulosPermissoesAoPerfil() {
    this.moduloService.loading = true;
    this.desactivarBotaoSalvar = true;
    const dados = this.pegarModulosPermissoesAoPerfil();

    // console.log("dados:" + JSON.stringify(dados));

    this.moduloService
      .associarModuloPermissaoAoPerfil(dados)
      .pipe(first())
      .subscribe(
        (response) => {
          this.listarModulos();
          this.carregarDadosDoPerfil();
          this.moduloService.loading = false;
          this.esvaziarDadosCarregadosAnteriores();
          this.verificarMudancas();
        },
        (error) => {
          // console.log('error=>', error);
          this.moduloService.loading = true;
        }
      );
  }

  verificarModuloSubmoduloNoPerfil(modulo) {
    let res = null;
    if (modulo.is_principal) {
      res = this.modulosPorPerfilJaExistentes.find(
        (cada) => cada.modulo_id === modulo.id
      );
    }

    if (res != null && res != undefined) {
      const idElementoEmCausa = modulo.modulo_submodulo_id + '' + modulo.id;
      // this.trocarEstadoDosElementosAncestrais(idElementoEmCausa, true)
      return true;
    }

    if (!modulo.is_principal) {
      res = this.modulosPorPerfilJaExistentes.find(
        (cada) => cada.modulo_submodulo_id == modulo.modulo_submodulo_id
      );
    }

    if (res != null && res != undefined) {
      // const idElementoEmCausa = modulo.modulo_submodulo_id + "" + modulo.id
      // this.trocarEstadoDosElementosAncestrais(idElementoEmCausa, true)
      return true;
    }

    return false;
  }

  verificarPermissaoNoPerfil(permissao_id, modulo_permissao_id) {
    // const modulosEmCausaExiste = this.permissoesPorPerfilJaExistentes.filter(cada => cada.permission_id == permissao_id && cada.modulo_permissao_id == modulo_permissao_id)
    const modulosEmCausaExiste = this.permissoesPorPerfilJaExistentes.filter(
      (cada) => cada.permission_id == permissao_id
    );
    // if (modulosEmCausaExiste.length > 0) {
    //   this.trocarEstadoDosElementosAncestraisOperacao("inputOperacao"+permissao_id, true)
    // }
    return modulosEmCausaExiste.length > 0 ? true : false;
  }

  public listarModulosPorPerfilJaExistentes() {
    this.moduloService.loading = true;
    this.formService.getModulosPorPerfil(this.role_id).subscribe((response) => {
      this.modulosPorPerfilJaExistentes = response;
      this.moduloService.loading = false;
    });
  }

  public listarPermissoesPorPerfilJaExistentes() {
    this.formService
      .getPermissoesPorPerfil(this.role_id)
      .subscribe((response) => {
        this.permissoesPorPerfilJaExistentes = response;
      });
  }

  public carregarDadosDoPerfil() {
    this.listarPermissoesPorPerfilJaExistentes();
    this.listarModulosPorPerfilJaExistentes();
  }

  public listarSubModulosPorModulo(modulo_id) {
    this.formService
      .getSubModulosByModulosId(modulo_id)
      .subscribe((response) => {
        this.subModulos = response;
      });
  }

  public listarSubModulosPorModulo2(modulo) {
    this.subModulos = modulo.subModulos;
  }

  public actualizarListaPermissoes(modulo_id) {}

  public getRoles() {
    this.formService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }
}
