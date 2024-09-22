import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService extends BaseStorageService {

  constructor(protected http: ApiService) {
    super(`auth`);
  }

  private route: string = `auth`;


  resetPassword(form: FormGroup) {
    return this.store(form, '/password/resetByUserAuth');
  }

  updatePassword(form: any = {}): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.route}/password/updatePassword`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

}
