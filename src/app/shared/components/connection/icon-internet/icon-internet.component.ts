import { Component, OnInit } from '@angular/core';
import { ConnectionMonitoringService } from '../connection-monitoring.service';

@Component({
  selector: 'icon-internet',
  templateUrl: './icon-internet.component.html',
  styleUrls: ['./icon-internet.component.css']
})
export class IconInternetComponent implements OnInit {

  constructor(public connectionService: ConnectionMonitoringService) { }

  ngOnInit(): void {
  }

}
