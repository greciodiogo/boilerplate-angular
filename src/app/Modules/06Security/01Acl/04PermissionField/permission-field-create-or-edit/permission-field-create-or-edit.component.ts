import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Permission } from '../../models/Permission';
import { FormService } from '@app/shared/services/form.service';
import { PermissionFieldService } from '../../services/permission_fields.service';

@Component({
  selector: 'app-permission-field-create-or-edit',
  templateUrl: './permission-field-create-or-edit.component.html',
  styleUrls: ['./permission-field-create-or-edit.component.css']
})
export class PermissionFieldCreateOrEditComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Permissão de Campo';
  @Input() permission: Permission = new Permission();
  @Input() simpleFormPermission: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  textoSlug: any
  e_permissao_dentro_outra: boolean
  entidade_relacionada: string

  permissions: any = [];

  submitted = false;

  constructor(
    public permissionFieldService: PermissionFieldService,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.permission = new Permission();
  }

  createForm() {
    this.simpleFormPermission = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormPermission.controls;
  }

  onReset() {
    this.permission = new Permission();
    this.submitted = false;
    this.simpleFormPermission.reset();
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormPermission.invalid) {
      return;
    }
    const id = this.simpleFormPermission.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.simpleFormPermission, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.permissionFieldService
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
          this.permissionFieldService.loading = false;
        }
      );
  }

  preencherSlug(evento) {
    this.textoSlug = evento.target.value?.toLowerCase();
    this.textoSlug = this.textoSlug.replace(/\s/g, '-')//replace(/ /g, "-") : "";
    this.textoSlug = this.textoSlug ? this.textoSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
    this.simpleFormPermission.patchValue({
      slug: this.textoSlug,
    })
  }

  setPermission(permission: Permission) {
    this.permission = permission
    if (!permission)
      this.title = "Registar Permissão de Campo"
    else {
      this.title = "Editar Permissão de Campo"
      this.simpleFormPermission.patchValue(permission)
    }
  }

}
