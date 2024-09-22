import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
})
export class ModuloService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`modulos`);
  }

   /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'associarModuloPermissaoAoPerfil'
   * @return Observable
   */
    associarModuloPermissaoAoPerfil(dados: Object): Observable<any> {
      this.loading = true;
      return this.http.post(`${this.url}/associarModuloPermissaoAoPerfil`, dados).pipe(finalize(() => {
        this.loading = false;
      }),
        map((data) => Object(data).data)
      );
    }

}
