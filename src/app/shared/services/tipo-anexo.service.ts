import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseStorageService } from './base-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TipoAnexoService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`tipoanexo`);
  }

  public getTypeAnexoByBanco(): Observable<any> {
    return this.http
      .get(`${this.url}/getTypeAnexoBancario`)
      .pipe(map((data) => Object(data).data));
  }
}
