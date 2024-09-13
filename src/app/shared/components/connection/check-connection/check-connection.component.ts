import { Component } from '@angular/core';
import { ConnectionMonitoringService } from '../connection-monitoring.service';

@Component({
  selector: 'InternetConnectionMonitoring',
  templateUrl: './check-connection.component.html',
  styleUrls: ['./check-connection.component.css'],
})
export class CheckConnectionComponent {
  constructor(public connectionService: ConnectionMonitoringService) {}
}
