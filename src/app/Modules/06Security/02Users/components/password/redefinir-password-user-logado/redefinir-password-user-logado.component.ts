import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
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
import * as RandExp from "randexp";
import { User } from '../../../models/User';
import { ResetPasswordService } from '../../../services/resetPassword.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { Router } from '@angular/router';
/** passwords must match - custom validator */
export const password_confirmationValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('password_confirmation');
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-redefinir-password-user-logado',
  templateUrl: './redefinir-password-user-logado.component.html',
  styleUrls: ['./redefinir-password-user-logado.component.css']
})
export class RedefinirPasswordUserLogadoComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() user: User = new User();
  @Input() simpleFormUser: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  submitted = false;
  formErrors: any;

  constructor(
    public resetPasswordService: ResetPasswordService,
    private formBuilder: FormBuilder,
    public vf: ValidationFormsService,
    public formService: FormService,public auth: AuthService,private router: Router,
  ) {
    this.createForm();
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit() {}

  createForm() {
    this.simpleFormUser = this.formBuilder.group(
      {
        old_password: ['',[Validators.required]],
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
      { validator: password_confirmationValidator }
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
    this.resetPasswordService.updatePassword(formulario.value).pipe(first()).subscribe(
        (response) => {
            this.submitted = false;
            formulario.reset();
            this.loadList.emit(Object(response).data);
            localStorage.clear();
            this.auth.subjLoggedIn$.next(false);
            window.location.replace('/login?returnUrl=boiler-angular-dashboard');
        },
        (error) => {
          this.submitted = false;
          this.resetPasswordService.loading = false;
        }
      );
  }

  gerarPassword() {

    const randexp = new RandExp(/[A-Z][0-9][!@#\$%\^&\*][a-z][A-Z][0-9]{8}/);
    //new RandExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}){8}/);
    randexp.defaultRange.add(0, 65535);
    this.simpleFormUser.patchValue({
      password: randexp.gen()
    });
  }
}
