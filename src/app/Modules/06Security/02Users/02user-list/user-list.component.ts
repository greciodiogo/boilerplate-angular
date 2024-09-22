import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';
import { User } from '@app/Modules/06Security/02Users/models/User';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FormService } from '@app/shared/services/form.service';
import { Role } from '../../01Acl/models/Role';

export class _Filter extends Filter {
  loja_id: string = '';
  role_id: string = '';
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new _Filter();
  public users: any = [];
  public user: User = new User();

  roles: Role[] = [];
  lojas: any[] = [];

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  tipoContaAConsiderarNaListagem="Todas"

  constructor(
    public _route: Router,
    public userService: UserService,
    public configService: FnService,
    private formBuilder: FormBuilder,
    public formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getLojas();
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarUser(),
    });
    this.subjectObj.next(1);
    this.pegarTipoContaAConsiderarNaListagem(this.activatedRoute.snapshot.paramMap.get('tipoContaAConsiderarNaListagem'))
  }

  pegarTipoContaAConsiderarNaListagem(tipoContaAConsiderarNaListagem) {
    if (tipoContaAConsiderarNaListagem) {
      this.tipoContaAConsiderarNaListagem = (tipoContaAConsiderarNaListagem == "Agentes") ? "Agentes" : "Todas";
    } else {
      this.tipoContaAConsiderarNaListagem = 'Todas'
    }
  }

  /**
   * @name "Listar users"
   * @descriptio "Esta Função permite Listar todas as users"
   * @author "fonebahia8@gmail.com"
   * @param start
   * @param end
   */
  public listarUser() {
    this.userService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('lojaId', this.filter.loja_id.toString())
      .set('roleId', this.filter.role_id.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('tipoContaAConsiderarNaListagem', this.tipoContaAConsiderarNaListagem.toString());
    const search = this.filter.search;

    this.userService.list(search, httpParams).subscribe(
      (data) => {
        this.users = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
      },
      (error) => {
        this.userService.loading = false;
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

  setUser(user: User) {
    // console.log("user=>",user);
    this.user = user;
  }

  public delete(id: number) {
    this.userService.delete(id).subscribe((error) => {
      this.userService.loading = false;
    });
  }
  public BloquearUser(id: number, status) {
    const form = this.formBuilder.group({ is_actived: [status] });
    this.userService.updateStatus(form.value, id).subscribe(
      () => {
        this.listarUser();
      },
      (error) => {
        this.userService.loading = false;
      }
    );
  }

  public getRoles() {
    this.formService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  getLojas() {
    this.formService.getLojas().subscribe((data) => {
      this.lojas = data;
    });
  }
}
