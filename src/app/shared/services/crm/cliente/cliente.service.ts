import { Injectable } from '@angular/core'; 
import { ApiService } from '@core/providers/api.service';  
import { BaseStorageService } from '../../base-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends BaseStorageService {
  constructor(protected http: ApiService) { 
    super(`clientes`); 
  } 
}
