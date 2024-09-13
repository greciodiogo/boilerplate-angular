import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map, debounceTime, finalize, tap } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { HttpParams } from '@angular/common/http';
import { StateModuleApiInterface } from '@app/shared/interfaces/StateModuleApiInterface';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
@Injectable({
  providedIn: 'root',
})
export abstract class BaseStorageService implements StateModuleApiInterface {

  protected url: string;

  protected http: ApiService;

  public loading: boolean = false;

  public permission: PermissionService = new PermissionService(new AuthService(null,null,null));

  /**
   *
   * @param url
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'Permite listar todas cartoes'
   * @return Observable
   */
  public list(search?: string, filters?: HttpParams, suburl = ""): Observable<any> {
    this.loading = true;
    filters =
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
  show(id: number): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/${id}`).pipe(
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

  store(form: Object = {}, suburl = ""): Observable<any> {
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

   update(form: Object = {}, id, suburl = ""): Observable<any> {
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
    console.log(id)
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

  upload(form: FormGroup,suburl = ""): Observable<any> {
    const formData =  new FormData();    this.loading = true;
    Object.entries(form).forEach(value=>{
      if(value[0]=="files"){
        value[1].forEach(file => {
          formData.append(value[0],file);
        });
      }
      formData.append(value[0],(value[1]||""));
    });
    console.log(formData)
    return this.http.file(`${this.url}${suburl}`, formData, true).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public canActivateRouterLink(permission:string){
    return this.permission.isOptionRouterLinkPermission(permission);
  }

}
