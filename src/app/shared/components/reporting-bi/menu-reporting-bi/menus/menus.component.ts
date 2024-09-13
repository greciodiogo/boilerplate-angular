import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { element } from 'protractor';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  @Input() data: any[];
  
  @Output() ChangedMenuEmitter = new EventEmitter();
 
  constructor(public permission: PermissionService) { }

  ngOnInit() {
  }

  toggleMenuSecound(event: any, data: any): void {
    var permissions = [];
    data?.itensMenu.forEach(element => {

      if(element?.permission == undefined )
      {
        permissions.push(element)
      }
      else if(this.canActivateRouterLink(element?.permission)){
        permissions.push(element)
      }
    });  
    
    let currentAction = event.currentTarget;

    $(".report-nav").removeClass("active");
    $(".direct-chat-text").removeClass("active");
    
    $(currentAction).addClass("active");
    $(currentAction).children(":first").children(":first").addClass("active");
   
    this.ChangedMenuEmitter.emit({itensMenu:permissions, title : data.title});
  }

  public canActivateRouterLink(permission:string){
    return this.permission.isOptionRouterLinkPermission(permission)
  }

}
