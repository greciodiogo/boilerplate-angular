import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ValidationFormsService } from '@shared/validation/validation-forms.service';
import { FormService } from '@app/shared/services/form.service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('password_confirmation');
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-redefinir-password',
  templateUrl: './redefinir-password.component.html',
  styleUrls: ['./redefinir-password.component.css'],
})
export class RedefinirPasswordComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() user: User = new User();
  @Input() simpleFormUser: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  submitted = false;
  formErrors: any;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public vf: ValidationFormsService,
    public formService: FormService
  ) {
    this.createForm();
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit() {}

  createForm() {
    this.simpleFormUser = this.formBuilder.group(
      {
        password: [
          null,
          [
            Validators.required,
            // Validators.minLength(this.vf.formRules.passwordMin),
            // Validators.pattern(this.vf.formRules.passwordPattern),
          ],
        ],
        password_confirmation: ['', [Validators.required]],
      },
      { validator: confirmPasswordValidator }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormUser.controls;
  }

  onReset() {
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
    this.createOrEdit(this.simpleFormUser,this.user.id);
  }

  createOrEdit(formulario: FormGroup,id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.userService.resetPassword(formulario.value,id).pipe(first()).subscribe(
        (response) => {
          this.submitted = false;
          formulario.reset();
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.userService.loading = false;
        }
      );
  }

  gerarPassword() {
    /*const RandExp = require('randexp');
    const randexp = new RandExp(/[A-Z][0-9][!@#\$%\^&\*][a-z][A-Z][0-9]{8}/);
    //new RandExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}){8}/);
    randexp.defaultRange.add(0, 65535);
    this.simpleFormUser.patchValue({
      password: randexp.gen()
    });*/

  }
}
