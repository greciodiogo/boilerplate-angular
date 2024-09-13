import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PermissionService } from '../authentication/permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private permService: PermissionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedPermission = route.data.expectedPermission; 
    if (expectedPermission === 'dashboard') {
      return of(true) 
    } 
    return this.permService.isValidPermission(expectedPermission).pipe(
      tap((b) => {
        if (!b) { 
            this.router.navigate(['/403'], {
              queryParams: { returnUrl: state.url },
            });  
        }
      })
    ); 
  }
}
