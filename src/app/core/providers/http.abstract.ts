
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export abstract class http {

    public abstract get(path: string, httpParams: HttpParams): Observable<any>;

    public abstract post(path: string, body: Object, authorization: boolean): Observable<any>;

    public abstract put(path: string, body: Object): Observable<any>;

    public abstract patch(path: string, body: Object):Observable<any>;

    public abstract delete(path: string, httpParams: HttpParams): Observable<any>;

    public abstract file(path: string, body: Object, authorization: boolean): Observable<any>;

}
