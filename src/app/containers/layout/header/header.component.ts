import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { ConnectionMonitoringService } from "@app/shared/components/connection/connection-monitoring.service";
import { environment as env } from '@env/environment';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  // styleUrls: [env.app=='MOVICEL'? '../theme/movicel.component.css':'../theme/at.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;

  constructor(public auth: AuthService, public connectionService: ConnectionMonitoringService) { }
  ngOnInit() {}


}
