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
import { Role } from '@app/Modules/06Security/01Acl/models/Role';
import { AlertComponent } from '@app/shared/components/notifications/alert/alert.component';
import { FormService } from '@app/shared/services/form.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import Swal from 'sweetalert2';
import { FnService } from '@app/shared/services/fn.helper.service';

@Component({
  selector: 'app-role-form-create-or-edit',
  templateUrl: './role-form-create-or-edit.component.html',
  styleUrls: ['./role-form-create-or-edit.component.css'],
})
export class RoleFormCreateOrEditComponent implements OnInit, OnChanges {
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Perfil';
  @Input() role: Role = new Role();
  @Input() simpleFormRole: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  @ViewChild(AlertComponent, { static: true })
  public alertComponent: AlertComponent;
  infoAviso = "A direcção de todos os utilizadores associados ao perfil informado será alterada para a direccão seleccionada "

  submitted = false;
  direccoes: any = []

  constructor(
    public roleService: RoleService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private toaster: ToastrService,
    private fnService:FnService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.listarDirecoes();
  }

  createForm() {
    this.simpleFormRole = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      direccao_id: [null, Validators.required],
      abrir_caixa: [null],
      more_session: [false],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormRole.controls;
  }

  onReset() {
    this.role = new Role();
    this.submitted = false;
    this.simpleFormRole.reset();
    this.createForm();
  }


  controlarNotificacaoTrocaDireccao(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: this.infoAviso+ `. \n foi alterada a direcção. Deseja continuar?`,
      text: "Confirmar Operação da troca de direcção!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Alterar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.createOrEdit(this.simpleFormRole, id === null ? true : false, id);
        return true;
      } else {
        return false
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormRole.invalid) {
      return;
    }
    const id = this.simpleFormRole.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update

    if (this.role.id !== null && this.role.direccao_id != this.simpleFormRole.value.direccao_id) {
      this.controlarNotificacaoTrocaDireccao(id)
    }
    else
      this.createOrEdit(this.simpleFormRole, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.roleService
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
          this.roleService.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // console.log(this.role)
    if (this.role.id !== null) {
      this.title = 'Editar Perfil';
      this.simpleFormRole.patchValue(this.role);
    } else {
      this.title = 'Registar Perfil';
    }
  }

  listarDirecoes() {
    this.formService.getDireccoes().pipe(first()).subscribe((data) => {
      this.direccoes = data;
    },
      (error) => {
        this.roleService.loading = false;
      })
  }

  notificarAlteracaoInfluenciaNoUser() {

      this.toaster.warning("Aviso", this.infoAviso)
      const notificacao = {
        message: this.infoAviso,
        classDiv: "alert-warning",
        classInfo: "fa-warning",
        textAlert: "Aviso",
        show: true,
      }
      this.fnService.alertEvent.emit(notificacao)

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: this.infoAviso,
        text: "Confirmar Operação da troca de direcção!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Alterar!',
        cancelButtonText: 'Não, Alterar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          this.simpleFormRole.patchValue({direccao_id:this.role?.direccao_id})
          return false
        }
      })

  }

}
