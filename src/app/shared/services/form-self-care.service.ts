import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormSelfCareService {
  private route: string = `form-self-care`;
  constructor(private http: ApiService) { }


  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRoles'
   * @return Observable
   */
  public getRoles(): Observable<any> {
    return this.http
      .get(`${this.route}/getRoles`)
      .pipe(map((data) => Object(data).data));
  }

  /* @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getLojas'
   * @return Observable
   */
  public getLojas(): Observable<any> {
    return this.http
      .get(`${this.route}/getLojas`)
      .pipe(map((data) => Object(data).data));
  }

}
