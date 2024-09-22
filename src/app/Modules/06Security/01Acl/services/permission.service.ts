import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { finalize, map,debounceTime } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
})
export class PermissionService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`permissions`);
  }


  /**
   * @author 'fonebahia8@gmail.com'
   * @description 'getAllPermissionsOfRole'
   * @return Observable
   */
   getAllPermissionsOfRole(id): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/getAllPermissionsOfRole/${id}`)
    .pipe(finalize(() => {this.loading = false;}),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getAllPermissionsOfModulo'
   * @return Observable
   */
   getAllPermissionsOfModulo(id): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/getAllPermissionsOfModulo/${id}`)
    .pipe(finalize(() => {this.loading = false;}),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'fonebahia8@gmail.com'
   * @description 'getAllPermissionsOfRole'
   * @return Observable
   */
   getAllPermissionsOfUser(id): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/getAllPermissionsOfUser/${id}`)
    .pipe(finalize(() => {this.loading = false;}),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'fonebahia8@gmail.com'
   * @description 'attachDetachPermissionsToRole'
   * @return Observable
   */
   attachDetachPermissionsToRole(form: FormGroup): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/attachDetachPermissionsToRole`, form).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'attachDetachPermissionsToModulo'
   * @return Observable
   */
   attachDetachPermissionsToModulo(dados:Object): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/attachDetachPermissionsToModulo`, dados).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'fonebahia8@gmail.com'
   * @description 'attachDetachPermissionsToUser'
   * @return Observable
   */
   attachDetachPermissionsToUser(form: FormGroup): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/attachDetachPermissionsToUser`, form).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

   /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Permite listar todas as permissoes associadas a um perfil'
   * @return Observable
   */
    public listarAssociadasARole(search?: string, filters?: HttpParams, url?: string): Observable<any> {
      this.loading = true;
      filters == undefined ? filters : filters.set('search', search.toString());
      return this.http.get(`${this.url}/getPermissoesAssociadasARole`, filters).pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
    }


    /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Permite listar todas as permissoes não associadas a um perfil'
   * @return Observable
   */
     public listarNaoAssociadasARole(search?: string, filters?: HttpParams, url?: string): Observable<any> {
      this.loading = true;
      filters == undefined ? filters : filters.set('search', search.toString());
      return this.http.get(`${this.url}/getPermissoesNaoAssociadasARole`, filters).pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
    }

     /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Permite listar todas as permissoes associadas a um modulo'
   * @return Observable
   */
      public listarPermissoesAssociadasAoModulo(search?: string, filters?: HttpParams, url?: string): Observable<any> {
        this.loading = true;
        filters == undefined ? filters : filters.set('search', search.toString());
        return this.http.get(`${this.url}/getPermissoesAssociadasAoModulo`, filters).pipe(
          debounceTime(500),
          finalize(() => {
            this.loading = false;
          }),
          map((data) => Object(data).data)
        );
      }
}
