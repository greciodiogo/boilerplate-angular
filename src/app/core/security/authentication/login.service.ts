import { Injectable } from '@angular/core';
import { ApiService } from '@providers/api.service';
import { map, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private api: ApiService, private auth: AuthService) {}

  /**
   *
   * @param username
   * @param password
   *
   * Descricao: recebe 2 parametros retorna um data
   */
  public login(username, password) {
    return this.api.post('auth/login', { username, password }, false).pipe(
      finalize(() => {}),
      map((response) => {
        const data = response.data;
        // login successful if there's a jwt token in the response
        if (data) {
          localStorage.setItem('frase','0')
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.auth.setItemLocalStorage(data);
          //this.router.navigate([this.returnUrl]);
          //window.location.replace(this.returnUrl);
        }
      })
    );
  }
}
