import {
  Component,
  OnInit,
  Compiler,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event as RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@core/security/authentication/auth.service';
import { RoutingService } from '@core/services/routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { environment as env } from '@env/environment'; 

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public description: string;
  public header: string;
  public heightStyle: number;
  public sidebarLeftHeight: number;
  public windowInnerHeight: number;

  public titleTag: string;
  public navigationEnd: boolean;
  public subscriptions = [];
  public layout = {
    customLayout: false,
    layoutNavigationTop: true,
  };

  public showOverlay = true;
 


  /*
  currentUser : User//{id:'', name:''};
  user: User;*/
  currentUser: any;
  currentUserSubscription: Subscription;
  /**
   * @method constructor
   * @param authService
   * @param routingService
   * @param titleService
   * @param changeDetectorRef
   * @param router
   */
  constructor(
    public auth: AuthService,
    private permService: PermissionService,
    private routingService: RoutingService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private compiler: Compiler,
    private spinner: NgxSpinnerService
  ) {
    this.compiler.clearCache(); 
  }

  cssApp(cssclass){
    // Pega o atributo do link clicado para definir qual será o valor a ser trocado.
    $("#temacss").attr("href",`/assets/css/themes/${cssclass}.css`);
  }

  /**
   * @method ngOnInit
   */
  ngOnInit() {

  this.cssApp(env.app);
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    this.titleTag = this.titleService.getTitle();

    this.subscriptions.push(
      this.routingService.onChange.subscribe((value: any) => {
        if (value && value[value.length - 1]) {
          this.titleService.setTitle(
            this.getTitle(value[value.length - 1].data['title'])
          );
          this.header = value[value.length - 1].data['title'];
          const layout = value[value.length - 1].data['layout'];
          if (layout != undefined) {
            this.layout = layout;
          }
          this.description = value[value.length - 1].data['description'];
        }
        this.changeDetectorRef.markForCheck();
      })
    );

    this.subscriptions.push(
      this.router.events.subscribe((routeEvent: RouterEvent) => {
        if (routeEvent instanceof NavigationStart) {
          this.navigationEnd = false;
        }
        if (routeEvent instanceof NavigationEnd) {
          this.navigationEnd = true;
        }
      })
    );
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {}

  /**
   * [getTitle description]
   * @method getTitle
   * @param title [description]
   * @return [description]
   */
  private getTitle(title: string): string {
    return title ? `boiler-angular-dashboard :: ${title}` : this.titleTag;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
      this.spinner.show();
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
      this.spinner.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
      this.spinner.hide();
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
      this.spinner.hide();
    }
  }
}
