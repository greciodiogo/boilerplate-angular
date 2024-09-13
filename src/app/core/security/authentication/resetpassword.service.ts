import { Injectable } from '@angular/core';
import { ApiService } from '@providers/api.service';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  public loading: boolean;
  constructor(private api: ApiService,private router: Router) {}

  public RecuperarPassword(email,link) {
    return this.api.get(`resetpassword/recover-password-sending-email?email=${email}&&link=${link}`).pipe(
      finalize(() => {}),
      map((response) => {
        const data = response.data;
        
        if (data) {
          /* localStorage.setItem('frase','0')
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.auth.setItemLocalStorage(data); */
        }
      })
    );
  }

  public verificToken(token) {
    this.loading = true;
    return this.api.get(`resetpassword/verificToken?token=${token}`).pipe(
      finalize(() => {
        this.loading = false;
      }),map((response) => response));
  }

  public resetPassword(password,token) {
    this.loading = true;
    return this.api.put(`resetpassword/resetPassword/${token}`,{password:password}).pipe(
      finalize(() => {
        this.loading = false;
      }),map((response) => response));
  }

}
