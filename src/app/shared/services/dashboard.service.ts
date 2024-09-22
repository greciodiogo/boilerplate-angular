import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private route:string =`dashboards`;
  public loading:boolean=false
  constructor(private http: ApiService) {}

  /**
   * @author 'fonebahia8@gmail.com'
   * @description 'getTypesIdentities'
   * @return Observable
   */
   public getDashboardInit(): Observable<any> {
    this.loading = true
    return this.http.get(`${this.route}/findDashboardInit`).pipe(finalize(()=>{this.loading = false}),map((data) => Object(data).data));
  }

}
