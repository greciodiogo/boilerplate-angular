import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
 
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`users`);
  }

  updateStatus(form: FormGroup, id){
    return this.update(form, id,"/updateStatus")
  }

  resetPassword(form: FormGroup,id){
    return this.update(form,id,"/password/resetByUser")
  }
}
