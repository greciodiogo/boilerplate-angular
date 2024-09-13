import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public auth: AuthService) { }

   /**
   *
   */
    isValidPermission(slug: string): Observable<boolean> {
      var is = this.auth.permissions.find((permission) => permission.slug === slug? true: false);
      if (is) {
        return of(true)
      }
      return new BehaviorSubject(false).asObservable();
    }

    /**
   *
   */
    public isOptionRouterLinkPermission(slug: string): boolean {
      var is = this.auth.permissions.find((permission) => permission.slug === slug? true: false);
      if (is) {
        return true
      }
      return false
    }

    public isOptionPermissionFields(slug: string): boolean {
      var is = this.auth.permissionFields.find((permission) => permission.slug === slug? true: false);
      if (is) {
        return true
      }
      return false
    }



}
