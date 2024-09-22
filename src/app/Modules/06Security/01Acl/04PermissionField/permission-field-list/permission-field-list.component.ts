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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { Permission } from '../../models/Permission';
import { FormService } from '@app/shared/services/form.service';
import { PermissionFieldService } from '../../services/permission_fields.service';
import { Router } from '@angular/router';
import { FnService } from '@app/shared/services/fn.helper.service';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PermissionFieldCreateOrEditComponent } from '../permission-field-create-or-edit/permission-field-create-or-edit.component';

@Component({
  selector: 'app-permission-field-list',
  templateUrl: './permission-field-list.component.html',
  styleUrls: ['./permission-field-list.component.css']
})
export class PermissionFieldListComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Permissão de Campo';
  @Input() permission: Permission = new Permission();
  @Input() simpleFormPermission: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  @ViewChild(PermissionFieldCreateOrEditComponent, { static: true }) public permissionFieldCreateOrEditComponent: PermissionFieldCreateOrEditComponent;
  textoSlug: any

  permissions: any = [];

  submitted = false;

  public pagination = new Pagination();
  public filter = new Filter()

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public permissionFieldService: PermissionFieldService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    public _route: Router,
    public configService: FnService
  ) {
  }

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarPermission(),
    });
    this.subjectObj.next(1);
  }


  /**
   * @name "Listar permissions"
   * @descriptio "Esta Função permite Listar todas as permissions"
   * @author "mavipela@gmail.com"
   * @param start
   * @param end
   */
  public listarPermission() {
    this.permissionFieldService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString());
    const search = this.filter.search;

    this.permissionFieldService.list(search, httpParams).subscribe(data => {
      this.permissions = data.data
      this.pagination.page = data.page;
      this.pagination.perPage = data.perPage;
      this.pagination.lastPage = data.lastPage;
      this.pagination.total = data.total;
    }, error => {
      this.permissionFieldService.loading = false
    });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public delete(id: number) {
    this.permissionFieldService.delete(id).subscribe(error => { this.permissionFieldService.loading = false });
  }

  setPermission(permission: Permission) {
    this.permission = permission
  }

}
