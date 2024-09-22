


import { Component, OnInit } from "@angular/core";
import {  Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { PermissionService } from "@app/Modules/06Security/01Acl/services/permission.service";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { Permission } from "../../models/Permission";
 @Component({
  selector: 'app-permission-listar',
  templateUrl: './permission-listar.component.html',
  styleUrls: ['./permission-listar.component.css']
})
export class PermissionListarComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter()
  public permissions: any = [];
  public permission: Permission = new Permission();


  public  observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public _route: Router,
    public permissionService: PermissionService,
    public configService: FnService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarPermission(),
    });
    this.subjectObj.next(1);
  }


  /**
   * @name "Listar permissions"
   * @descriptio "Esta Função permite Listar todas as permissions"
   * @author "fonebahia8@gmail.com"
   * @param start
   * @param end
   */
  public listarPermission() {
    this.permissionService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString());
      const search = this.filter.search;

    this.permissionService.list(search, httpParams).subscribe(data => {
        this.permissions  = data.data
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
    },error=>{
      this.permissionService.loading = false
    });
  }

  //--------------------------------------------------------------------------

 public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  setPermission(permission: Permission){
    this.permission = permission
  }

  public delete(id:number){
    this.permissionService.delete(id).subscribe(error=>{this.permissionService.loading = false});
  }
}
