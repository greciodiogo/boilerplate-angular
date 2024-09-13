import { Injectable } from '@angular/core';
import { ConnectionState, ConnectionService } from "ngx-connection-service";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectionMonitoringService {

  currentState: ConnectionState;

  constructor(private connectionService: ConnectionService) {
    /*this.connectionService.monitor()
      .subscribe((currentState: ConnectionState) => {
        this.currentState = currentState;
        //console.log('currentState: ', this.currentState)
    });*/
  }

  get networkConnection():string{
    return this.currentState?.hasNetworkConnection ? 'ON' : 'OFF'
  }

  get internetConnection():string{
    return this.currentState?.hasInternetAccess ? 'ON' : 'OFF'
  }

}
