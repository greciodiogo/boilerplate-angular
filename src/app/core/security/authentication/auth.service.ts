
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/core/providers/api.service';
import { Authenticated } from '@app/resources/Modules/06Security/00Auth/models/authenticated';

import { User } from '@app/resources/Modules/06Security/02Users/models/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment as env } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { Permission } from '@app/resources/Modules/06Security/01Acl/models/Permission';
import { Token } from '@app/resources/Modules/06Security/00Auth/models/token';
import { PermissionFields } from '@app/resources/Modules/06Security/01Acl/models/PermissionFields';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentToken = 'accessToken';
  public refreshToken = '_refreshToken';
  readonly url = env.app_url + 'auth';

  public subjAuthenticated$: BehaviorSubject<Authenticated> =
    new BehaviorSubject(null);
  public subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userData$ = new Authenticated();

  constructor(
    private http: ApiService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  public get token(): Token {
    return new Token().deserialize(this.getItemLocalStorage.token);
  }

  get permissions(): Permission[] {
    const permissions: Permission[] = !this.isLoggedIn
      ? []
      : this.getItemLocalStorage.permissions.map((permission) => permission);
    return permissions;
  }

  get permissionFields(): PermissionFields[] {
    const permissionFields: PermissionFields[] = !this.isLoggedIn
      ? []
      : this.getItemLocalStorage.permissionFields.map((permission) => permission);
    return permissionFields;
  }

  get user(): User {
    return !this.isLoggedIn
      ? new User()
      : new User().deserialize({
        ...this.getItemLocalStorage.user,
        perfil: this.getItemLocalStorage.role,
      });
  }

  /**
   *
   */
  public isAuthenticated(): Observable<boolean> {
    var moment = require("moment");
    const dataAcual = moment(new Date()).format("YYYY-MM-DD");
    const token = this.getItemLocalStorage;
    if (token && this.last_access == dataAcual) {
      this.subjLoggedIn$.next(true);
      return of(true);
    }
    return this.subjLoggedIn$.asObservable();
  }

  public get isLoggedIn(): boolean {
    const token = this.getItemLocalStorage;
    return token ? true : false;
  }

  get getItemLocalStorage() {
    return JSON.parse(localStorage.getItem(this.currentToken));
  }

  public setItemLocalStorage(d) {
    localStorage.setItem('screen', '0');
    localStorage.setItem('last_access', d.last_access);
    localStorage.setItem(this.currentToken, JSON.stringify(d));
  }

  get last_access(): string {
    return localStorage.getItem('last_access')
  }
  // Terminar sessão
  public logout(): void {
    /*const refreshToken = localStorage.getItem(this.refreshToken);
    const username = this.user.id
    // remove user from local storage to log user out
    this.http.post(`${env.app_url}/auth/logout`,{refreshaccessToken: refreshToken, _refId: username})
      .pipe(finalize(() => {}))
      .subscribe((data) => {
        this.clearStoreAndRedirectLogin();
      });*/

    this.trocarIsLoggedUser(this.user);
    this.clearStoreAndRedirectLogin();
  }

  public trocarIsLoggedUser(currentUser) {
    this.http.post(`auth/changeIsLoggedUser`, currentUser)
      .pipe(finalize(() => { }))
      .subscribe((data) => {
      });
  }

  clearStoreAndRedirectLogin() {
    //remove user from local storage to log user out
    localStorage.clear();
    this.subjLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  swalRefreshToken() {
    if (!localStorage.getItem(this.currentToken)) {
      this.clearStoreAndRedirectLogin();
      return false;
    }
    localStorage.setItem('screen', '1');
    //var formData: FormData = new FormData();
    const swal = Swal.mixin({
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        header: 'header-class',
        title: 'title-class',
        closeButton: 'close-button-class',
        icon: 'warning',
        content: 'content-class',
        input: 'input-class',
        actions: 'actions-class',
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-default',
        footer: 'footer-class',
      },
      buttonsStyling: false,
    });
    swal
      .fire({
        backdrop: true,
        title: 'Sessão em Pausa',
        text: 'Para Continuar nesta sessão, por favor digite a sua senha',

        input: 'password',
        inputPlaceholder: 'Digite a sua senha',
        inputAttributes: {
          autocapitalize: 'off',
        },
        confirmButtonText: '<i class="fa fa-unlock"></i>&nbsp; Continuar',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        cancelButtonText: '<i class="fa fa-lock"></i>&nbsp; Ignorar',
        preConfirm: (password) => {
          const username = this.user.username;
          const refreshToken = localStorage.getItem(this.refreshToken);
          return fetch(`${this.url}/refresh-token`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: password,
              username: username,
              refreshaccessToken: refreshToken,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Falha na Autenticação');
              }
              return response.json();
            })
            .catch((error) => {
              this.toastrService.error(
                'Nome de utilizador ou Password Inválido, ou consulta o administrador para verificar se a sua conta está activa',
                ''
              );
              Swal.showValidationMessage(`${error}`);
            });
        },

        allowOutsideClick: false, //() => !Swal.isLoading()
      })
      .then((result) => {
        if (result.value) {

          this.setItemLocalStorage(result.value.data);
          Swal.fire({ title: `Bem-vindo de volta, ${result.value.data.user.name}` });
          return true;
        } else {
          this.logout();
          return false;
        }
      });
  }


}
