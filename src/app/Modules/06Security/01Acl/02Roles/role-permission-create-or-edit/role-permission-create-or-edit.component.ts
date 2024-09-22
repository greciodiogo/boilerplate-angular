import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { RoleService } from '../../services/role.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { ModuloService } from "@app/Modules/06Security/01Acl/services/modulos.service";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { FormService } from '@app/shared/services/form.service';

@Component({
  selector: 'app-role-permission-create-or-edit',
  templateUrl: './role-permission-create-or-edit.component.html',
  styleUrls: ['./role-permission-create-or-edit.component.css'],
})
export class RolePermissionCreateOrEditComponent implements OnInit, OnChanges {
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Adicionar Permissions';
  @Input() role: Role = new Role();
  @Input() simpleFormRole: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  modulo_id:number
  submitted = false;
  public modulos: any = [];
  public subModulos: any = [];
  public pagination = new Pagination();
  public filter = new Filter()
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  

  constructor( public roleService: RoleService,public moduloService: ModuloService,public formService:FormService,
    public configService: FnService) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarModulos(),
    });
    this.subjectObj.next(1);
  }

  onReset() {
    this.role = new Role();
    this.submitted = false;
    this.simpleFormRole?.reset();
  }

  onSubmit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {}

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  async listarModulos() {
    this.formService.getModulos().subscribe((response) => {
      this.modulos = response;
    });
  }

  async listarSubModulos(evento) {
    this.formService.getSubModulosByModulosId(evento.target.id).subscribe((response) => {
      this.subModulos = response;
    });
  }
}
