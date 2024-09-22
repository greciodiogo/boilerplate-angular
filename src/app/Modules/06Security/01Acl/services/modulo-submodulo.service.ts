import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModuloSubMouloService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`modulo-submodulo`);
  }


  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'attachDetachSubModuloToModulo'
   * @return Observable
   */
  attachDetachSubModuloToModulo(dados: Object): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/attachOrDetachSubModulosToModulo`, dados).pipe(finalize(() => {
      this.loading = false;
    }),
      map((data) => Object(data).data)
    );
  }

}
