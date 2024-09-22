import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { ModuloService } from "@app/Modules/06Security/01Acl/services/modulos.service";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { Permission } from "../../models/Permission";
import { Modulo } from "../../models/Modulo";
import { PermissionService } from "@app/Modules/06Security/01Acl/services/permission.service";
import { Role } from '../../models/Role';
import { FormGroup } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { FormService } from '@app/shared/services/form.service';
import * as $ from 'jquery'
import { TableCheckedComponent } from '../table-checked/table-checked.component';
import { TableUncheckedComponent } from '../table-unchecked/table-unchecked.component';

@Component({
  selector: 'app-modulos-permissoes',
  templateUrl: './modulos-permissoes.component.html',
  styleUrls: ['./modulos-permissoes.component.css']
})
export class ModulosPermissoessComponent implements OnInit {

  public paginationModulo = new Pagination();
  public filter = new Filter()
  public modulo = new Modulo()
  public role = new Role()
  public modulos: any = [];
  roles: any = [];
  public subModulos: any = [];
  public permission: Permission = new Permission();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  @Input() is_modal: boolean = false;
  @Input() simpleFormRole: FormGroup;
  noSeleccionado;
  submitted = false;
  modulo_id: number;
  role_id: number;
  idModuloAncestral;
  search:string=""
  typeOrderBy:string=""
  typeFilter:string=""


  @ViewChild(TableCheckedComponent, { static: true }) public tableCheckedComponent: TableCheckedComponent;
  @ViewChild(TableUncheckedComponent, { static: true }) public tableUncheckedComponent: TableUncheckedComponent;
  opcoesModo = [
    { valor: "W", texto: "Escrita" },
    { valor: "R", texto: "Leitura" },
  ]

  opcoesCRUD = [
    { nome: 'Criar', sigla: "C", siglaPT: "C", modo: "W" },
    { nome: 'Listar', sigla: "R", siglaPT: "L", modo: "R" },
    { nome: 'Actualizar', sigla: "U", siglaPT: "A", modo: "W" },
    { nome: 'Apagar', sigla: "D", siglaPT: "D", modo: "W" },
    { nome: 'Executar', sigla: "E", siglaPT: "E", modo: "WR" },
  ]

  constructor(
    public permissionService: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService,
    public roleService: RoleService,
    public formService: FormService
  ) { }

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarModulos(),
    });
    this.subjectObj.next(1);
    this.modulo = null
    this.getRoles();
  }

  onReset() {
    this.role = new Role();
    this.submitted = false;
    this.simpleFormRole?.reset();
  }

  async listarModulosArvore() {
    this.moduloService.loading = true
    this.formService.getModulosESubModulos().subscribe((response) => {
      this.modulos = response;
      this.moduloService.loading = false
    });
  }

  public listarModulos() {
    this.moduloService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.paginationModulo.page || 1).toString())
      .set("perPage", (this.paginationModulo.perPage || 10).toString())
      .set("search", this.search)
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.typeOrderBy)
      .set("typeFilter", this.typeFilter);
    const search = this.search;

    this.moduloService.list(search, httpParams).subscribe(data => {
      this.modulos = data.data
      if(this.modulos?.length==1){
        this.pegarModulo(this.modulos[0])  
        this.actualizarListaPermissoes(this.modulos[0]?.id)      
      }else{
       
        this.tableCheckedComponent.setarDados();
        this.tableUncheckedComponent.setarDados();
        console.log("Trunck ",this.tableCheckedComponent.setarDados());
        // console.log("Untrunck ",this.tableUncheckedComponent.setarDados());
        
        
      }
      this.paginationModulo.page = data.page;
      this.paginationModulo.perPage = data.perPage;
      this.paginationModulo.lastPage = data.lastPage;
      this.paginationModulo.total = data.total;
    }, error => {
      this.moduloService.loading = false
    });
  }

  public getPageFilterDataModulo(page: number) {
    if (this.paginationModulo.perPage == null) {
      return;
    }
    this.paginationModulo.page = page;
    this.subjectObj.next(this.paginationModulo.page);
  }

  setModulo(modulo: Modulo) {
    this.modulo = modulo
  }

  public delete(id: number) {
    this.permissionService.delete(id).subscribe(error => { this.permissionService.loading = false });
  }

  onSubmit() { }

  pegarIdAncestral(idInputModulo) {
    var liAncestral = $('#' + idInputModulo).parent().parent();
    this.idModuloAncestral = $(liAncestral).attr("id")
  }

  pegarModulo(modulo) {
    // if (modulo.is_principal)
    this.modulo_id = modulo.id

    // this.pegarIdAncestral(modulo.id);
    this.noSeleccionado = modulo
    this.modulo = modulo
  }

  public listarSubModulosPorModulo(modulo_id) {
    this.formService.getSubModulosByModulosId(modulo_id).subscribe((response) => {
      this.subModulos = response;
      return this.subModulos;
    });
  }

  public listarSubModulosPorModulo2(modulo) {
    this.subModulos = modulo.subModulos;
  }

  public actualizarListaPermissoes(modulo_id) {
    this.tableCheckedComponent.listarPermissoesAssociadas(modulo_id);
    this.tableUncheckedComponent.listarPermissoesNaoAssociadas(modulo_id);
  }


  public getRoles() {
    this.formService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  qtdMaximaFilhos() {
    return 0;
  }

}
