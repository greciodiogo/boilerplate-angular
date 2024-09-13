import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RechargeService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`recharges`);
  }

/**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite actualizar'
   * @param form
   * @param params
   */

 public rechargesCard(form: FormGroup): Observable<any> {
  return this.store(form,'/rechargesCard')
}

}
