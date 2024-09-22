import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@app/Modules/06Security/02Users/models/User';

@Component({
  selector: 'app-user-roles-create-or-edit',
  templateUrl: './user-roles-create-or-edit.component.html',
  styleUrls: ['./user-roles-create-or-edit.component.css']
})
export class UserRolesCreateOrEditComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Adicionar Permissions';
  @Input() user: User = new User();
  @Input() simpleFormRole: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){}

}
