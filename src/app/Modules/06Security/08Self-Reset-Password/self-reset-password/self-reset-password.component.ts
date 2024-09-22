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
import { User } from '@app/Modules/06Security/02Users/models/User';
import { Router,ActivatedRoute } from '@angular/router';
import { ResetpasswordService } from '@core/security/authentication/resetpassword.service';
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
  selector: 'app-self-reset-password',
  templateUrl: './self-reset-password.component.html',
  styleUrls: ['./self-reset-password.component.css']
})
export class SelfResetPasswordComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() user: User = new User(); 
  @Input() simpleFormUser: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  submitted = false;
  formErrors: any;
  token  = "";

  constructor(
    public resetPasswordService: ResetpasswordService, 
    private formBuilder: FormBuilder,
    public vf: ValidationFormsService,
    public formService: FormService,private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit() {
    this.validToken();
  }
     async  validToken(){
      await  this.resetPasswordService.verificToken(this.route.snapshot.paramMap.get("token")).pipe(first()).subscribe(
      (response) => {
        {
          if(response.statusCode==404)this.router.navigate(['/404']);
          this.user = Object(response) ;
        }
      },
      (error) => {
        this.submitted = false;
      }
    );  
     }
  createForm() {
    this.simpleFormUser = this.formBuilder.group(
      {
        password: [null,[Validators.required],
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
    /* this.user = new User(); */
    this.submitted = false;
    this.simpleFormUser.reset();
    this.createForm();
  }

   public  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormUser.invalid) {
      return;
    }
    this.createOrEdit(this.simpleFormUser,2);
  }

  createOrEdit(formulario: FormGroup,id) {
    // TODO: usado para fazer a requisição com a api de criação de object
       this.resetPasswordService.resetPassword(this.simpleFormUser.value.password,this.route.snapshot.paramMap.get("token")).pipe(first()).subscribe(
        (response) => {
          this.router.navigate(['/login'])
        },
        (error) => {
          this.submitted = false;
          this.resetPasswordService.loading = false;
        }
      );   
  }

}
