import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { ResetpasswordService } from '@core/security/authentication/resetpassword.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @Input() is_modal: boolean = true;
  @ViewChild('closeModal') closeModal: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public recuperarPassword: ResetpasswordService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.recuperarPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      link: ['', null],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  
  get f() {
    return this.recuperarPasswordForm.controls;
  }

  public onSubmit(){
    this.submitted = true;
    if (this.recuperarPasswordForm.invalid) {
      return;
    }
    var url = document.URL.split('/')

    console.log(url[0]);
    console.log(url[2]);
    this.recuperarPasswordForm.patchValue({
      link: (url[2]+'/')
    }); 

    this.loading = true;
    this.recuperarPassword.RecuperarPassword(this.f.email.value,this.f.link.value)
      .pipe(first(), finalize(()=>{ this.loading = false; }))
      .subscribe( data => {
          this.closeModal.nativeElement.click();
          this.onReset();
        },
        error => {
          this.loading = false;
        });
  }

  onReset() {
    this.submitted = false;
    this.recuperarPasswordForm.reset();
  }

}
