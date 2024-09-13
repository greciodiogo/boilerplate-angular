import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckConnectionComponent } from './check-connection/check-connection.component';
import {ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken} from 'ngx-connection-service';
import { IconInternetComponent } from './icon-internet/icon-internet.component';

@NgModule({
  declarations: [CheckConnectionComponent, IconInternetComponent],
  imports: [
    CommonModule
  ], 
  exports:[CheckConnectionComponent],  
  providers: [    
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: false, 
        eartbeatUrl: 'internethealthtest.org',
        requestMethod: 'get', 
        heartbeatInterval: 3000
      }
    }
  ]
})
export class ConnectionModule { }
