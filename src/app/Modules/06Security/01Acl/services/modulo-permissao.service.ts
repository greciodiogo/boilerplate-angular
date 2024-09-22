import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModuloPermissaoService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`modulo-permissao`);
  }


  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'attachDetachPermissionsToModulo'
   * @return Observable
   */
  attachDetachPermissionsToModulo(dados: Object): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/attachDetachPermissionsToModulo`, dados).pipe(finalize(() => {
      this.loading = false;
    }),
      map((data) => Object(data).data)
    );
  }

}
