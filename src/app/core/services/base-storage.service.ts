import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map, debounceTime, finalize, catchError } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { HttpParams } from '@angular/common/http';
import { StateModuleApiInterface } from '@app/core/interfaces/StateModuleApiInterface';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { environment as env } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export abstract class BaseStorageService implements StateModuleApiInterface {
  public url: string;
  public appName: string;

  protected http: ApiService;

  public loading: boolean = false;

  public permission: PermissionService = new PermissionService(
    new AuthService(null, null, null)
  );

  /**
   *
   * @param url
   */
  constructor(url: string) {
    this.url = url;
    this.appName = env.app;
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite listar todos dados'
   * @return Observable
   */
  public list(search?: string, filters?: HttpParams, suburl: string=''): Observable<any> {
    this.loading = true;
    filters == undefined ? filters : filters.set('search', search.toString());
    return this.http.get(`${this.url}${suburl}`, filters).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite visualizar'
   * @param id
   */
  show(id: number, suburl: string=''): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/${id}${suburl}`).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite registar'
   * @param form
   * @returns
   */

  store(form: Object = {}, suburl = ''): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}${suburl}`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }
  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite actualizar'
   * @param form
   * @param params
   */

  update(form: Object = {}, id, suburl = ''): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}${suburl}/${id}`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite eliminar'
   * @param id
   */
  delete(id: number) {
    this.loading = true;
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite actualizar'
   * @param form
   * @param params
   */

  storeOrUpdate(form: FormGroup, id = null): Observable<any> {
    return id == null ? this.store(form) : this.update(form, id);
  }

  public canActivateRouterLink(permission: string) {
    return this.permission.isOptionRouterLinkPermission(permission);
  }

  public canActivateField(permissionField: string) {
    if(this.appName.toLocaleUpperCase() =='DEV') return true;
    return this.permission.isOptionPermissionFields(permissionField);
  }
}
