import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogsService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`logs`);
  }

  public getLogsAccess(
    search?: string,
    filters?: HttpParams,
    url?: string
  ): Observable<any> {
    this.loading = true;
    filters == undefined ? filters : filters.set('search', search.toString());

    return this.http
      .get(`${this.url}/getLogsAccess`, filters)
      .pipe(map((data) => Object(data).data));
  }

  public getLogsOperation(
    search?: string,
    filters?: HttpParams,
    url?: string
  ): Observable<any> {
    this.loading = true;
    filters == undefined ? filters : filters.set('search', search.toString());

    return this.http
      .get(`${this.url}/getLogsOperation`, filters)
      .pipe(map((data) => Object(data).data));
  }
}
