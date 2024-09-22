import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { Theme } from '@app/containers/layout/themeApp';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  @Input() public currentUser: any
  @Input() public authenticated: AuthService;
  @Input() public permission: PermissionService;
  @Input() public themeApp:Theme;

  constructor() { }

  ngOnInit() {
  }

  public canActivateRouterLink(permission:string){
    return this.permission.isOptionRouterLinkPermission(permission)
  }

  get logotipo(): string{
    return  `${env.app}.png`;
  }
}
