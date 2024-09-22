import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-role-listar',
  templateUrl: './role-listar.component.html',
  styleUrls: ['./role-listar.component.css'],
})
export class RoleListarComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new Filter();
  public roles: any = [];
  public role: Role = new Role();

  teste: any = [];

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public _route: Router,
    public roleService: RoleService,
    public configService: FnService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarRole(),
    });
    this.subjectObj.next(1);
  }

  /**
   * @name "Listar roles"
   * @descriptio "Esta Função permite Listar todas as roles"
   * @author "fonebahia8@gmail.com"
   * @param start
   * @param end
   */
  public listarRole() {
    this.roleService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString());
    const search = this.filter.search;

    this.roleService.list(search, httpParams).subscribe(
      (data) => {
        this.roles = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
      },
      (error) => {
        this.roleService.loading = false;
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

  setRole(role: Role) {
    this.role = role;
  }

  public delete(id: number) {
    this.roleService.delete(id).subscribe((error) => {
      this.roleService.loading = false;
    });
  }

  selectedData(data) {
    // console.log("selectedData=>",data);
    this.teste = data;
  }
}
