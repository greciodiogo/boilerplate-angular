import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new Filter()
  public modulo = new Modulo()
  public modulos: any = [];
  public permission: Permission = new Permission();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  @Output() private modulo_id = new EventEmitter<any>();
  
  constructor(
    public permissionService: PermissionService,
    public moduloService: ModuloService,
    public configService: FnService
  ) { }

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarModulos(),
    });
    this.subjectObj.next(1);
    this.modulo = null;
  }

  

  public listarModulos() {
    this.moduloService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString());
    const search = this.filter.search;

    this.moduloService.list(search, httpParams).subscribe(data => {
      this.modulos = data.data
      this.pagination.page = data.page;
      this.pagination.perPage = data.perPage;
      this.pagination.lastPage = data.lastPage;
      this.pagination.total = data.total;
    }, error => {
      this.moduloService.loading = false
    });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  setModulo(modulo: Modulo) {
    this.modulo = modulo
  }

  public delete(id: number) {
    this.moduloService.delete(id).subscribe(error => { this.moduloService.loading = false });
  }

  pegarModulo(modulo_id) {
    this.modulo_id.emit(modulo_id);
  }

}
