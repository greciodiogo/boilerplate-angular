import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { http } from './http.abstract';
import { environment as env } from '@env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements http {
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  /**
   *
   * @param authorization
   * @returns
   */
  private setHeaders(authorization: boolean = true): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (this.jwtService.tokenGetter() && authorization) {
      headersConfig['Authorization'] = this.jwtService.tokenGetter();
    }
    return new HttpHeaders(headersConfig);
  }

  public formatErrors(error: any) {
    return throwError(JSON.stringify(error));
  }

  /**
   *
   * @param path
   * @param httpParams
   * @returns
   */
  public get(
    path: string,
    httpParams: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get<any>(`${env.app_url}${path}`, {
        headers: this.setHeaders(),
        params: httpParams,
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param body
   * @param authorization
   * @returns
   */
  public post(
    path: string,
    body: Object = {},
    authorization = true
  ): Observable<any> {
    return this.http
      .post<any>(`${env.app_url}${path}`, body, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param body
   * @returns
   */
  public put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put<any>(`${env.app_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }
  /**
   *
   * @param path
   * @param body
   * @returns
   */
  public patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch<any>(`${env.app_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param httpParams
   * @returns
   */
  public delete(
    path: string,
    httpParams: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .delete<any>(`${env.app_url}${path}`, {
        headers: this.setHeaders(),
        params: httpParams,
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   */
  public file(
    path: string,
    body: Object = {},
    authorization = false
  ): Observable<any> {
    return this.http
      .post<any>(`${env.app_url}${path}`, body, {
        headers: {
          Authorization: authorization ? this.jwtService.tokenGetter() : '',
        },
        reportProgress: true,
        observe: 'events',
        responseType: 'blob' as 'json',
      })
      .pipe(catchError(this.formatErrors));
  }

  public readFileFromServer(
    path: string,
    body: Object = {},
    authorization = true
  ): Observable<any> {
    return this.http
      .post<Blob>(`${env.app_url}${path}`, body, {
        responseType: 'blob' as 'json',
        reportProgress: true,
        headers: {
          Authorization: authorization ? this.jwtService.tokenGetter() : '',
        },
      })
      .pipe(
        map((res) => {
          return new Blob([res], { type: 'application/octet-stream' });
        }),
        catchError(this.formatErrors)
      );
  }

  /**
   *
   * @param path
   * @param body
   * @param authorization
   * @returns
   */
   public post_file(
    path: string,
    body: Object = {},
    options:Object ={},
    authorization = true
  ): Observable<any> {
    return this.http
      .post<any>(`${env.app_url}${path}`, body, {...options, headers: this.setHeaders()})
      .pipe(catchError(this.formatErrors));
  }
}
