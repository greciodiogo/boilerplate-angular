import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '@app/Modules/06Security/02Users/models/User';
 import { first } from 'rxjs/operators';
import { ValidationFormsService } from "@shared/validation/validation-forms.service";
import { FormService } from '@app/shared/services/form.service';
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { UserService } from '../services/user.service';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { Observable, Subject } from 'rxjs';

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('password_confirmation');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};


@Component({
  selector: 'app-user-form-create-or-edit',
  templateUrl: './user-form-create-or-edit.component.html',
  styleUrls: ['./user-form-create-or-edit.component.css']
})
export class UserFormCreateOrEditComponent implements OnInit, OnChanges {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar User';
  @Input() user: User = new User();
  @Input() simpleFormUser: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  @Input() roles: Role[] = []
  @Input() lojas:any[] = []

  submitted = false;
  formErrors: any;
  public tiposAnexo: any = [];

  public pagination = new Pagination();
  public filter = new Filter();

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public vf: ValidationFormsService,
    public formService: FormService
  ) {
    this.createForm();
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit() {

  }


  createForm() {
    this.simpleFormUser = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      role_id: [null, Validators.required],
      is_actived: [null, Validators.required],
      loja_id: [null],
      username: [null, Validators.required],
      password: [null,
        [Validators.required,
        // Validators.minLength(this.vf.formRules.passwordMin),
        // Validators.pattern(this.vf.formRules.passwordPattern)
        ]],
      password_confirmation: ['',[Validators.required]],
      direccao_id:[null]
    },{ validator: confirmPasswordValidator });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormUser.controls;
  }

  onReset() {
    this.title = 'Registar User';
    this.user = new User();
    this.submitted = false;
    this.simpleFormUser.reset();
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormUser.invalid) {
      return;
    }
    const id = this.simpleFormUser.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.simpleFormUser.patchValue({direccao_id: this.roles.find(role=>role.id==this.simpleFormUser.value.role_id)?.direccao_id})
    this.createOrEdit(this.simpleFormUser, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.userService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          if (isCreate) {
            formulario.reset();
          }
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.userService.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.user.id !== null) {
      this.simpleFormUser.get('username').clearValidators();
      this.simpleFormUser.get('password').clearValidators();
      this.simpleFormUser.get('password_confirmation').clearValidators();
      this.simpleFormUser.get('username').disable();
      this.simpleFormUser.get('password').disable();
      this.simpleFormUser.get('password_confirmation').disable();
      this.title = 'Editar User';
      delete this.user.password;
      this.simpleFormUser.patchValue({...this.user,role_id: this.user.perfil.length >0? this.user.perfil[0].id:null, password:0,password_confirmation:0 });
    } else {
      this.title = 'Registar User';
    }
  }

  public getRoles() {
    this.formService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  getLojas() {
    this.formService.getLojas().subscribe(
      (data) => {
        this.lojas = data;
      }
    );
  }

}
