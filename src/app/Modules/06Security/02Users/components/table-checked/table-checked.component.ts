import { SelectionModel } from '@angular/cdk/collections';
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
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { User } from '@app/Modules/06Security/02Users/models/User';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table-checked',
  templateUrl: './table-checked.component.html',
  styleUrls: ['./table-checked.component.css'],
})
export class TableCheckedComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
  ];
  @Input() role: Role = new Role();
  @Input() user: User = new User();
  @Output() private selectedData = new EventEmitter<any>();

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  public permissions: any = [];
  public pagination = new Pagination();
  public filter = new Filter();

  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(public permissionService: PermissionService) {}

  ngOnInit(): void {}

  listarPermissoesUsuario() {
    this.permissionService.loading = true;
    this.permissionService.getAllPermissionsOfUser(this.user?.id).subscribe(
      (data) => {
        // console.log("dataInput=>",data);
        this.permissions = data;
        this.dataSource = data;
        data?.forEach((row) => {
          if (row?.checked) this.selection.select(row);
        });
      },
      (error) => {
        this.permissionService.loading = false;
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    this.selectedData.emit(this.selection.selected);
    const numRows = this.permissions.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.permissions.forEach((row) => this.selection.select(row));
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // this.selection.clear();
    // if (this.user?.id) {
    //   this.subjectObj.pipe(debounceTime(1000)).subscribe({
    //     next: () => this.listarPermissoesUsuario(),
    //   });
    //   this.subjectObj.next(1);
    // }
  }

  attachDetachPermissionsToUser(data) {
    this.permissionService
      .attachDetachPermissionsToUser(data)
      .pipe(first())
      .subscribe(
        (response) => {
          // console.log('response=>', response);
          this.permissionService.loading = true;
          this.listarPermissoesUsuario();
          //this.permissionService.loading = false;
        },
        (error) => {
          // console.log('error=>', error);
          this.permissionService.loading = false;
        }
      );
  }

  isSomeSelected(selectedRow, isChecked) {
    this.permissionService.loading = true;
    let data = { user_id: this.user?.id };
    if (selectedRow?.checked && !isChecked) {
      let detachPermission = {
        ...data,
        detachPermission: [selectedRow?.id],
        attachPermission: [],
      };
      this.attachDetachPermissionsToUser(detachPermission);
    }
    if (!selectedRow?.checked && isChecked) {
      let atachPermission = {
        ...data,
        attachPermission: [selectedRow?.id],
        detachPermission: [],
      };
      this.attachDetachPermissionsToUser(atachPermission);
    }
  }
}
