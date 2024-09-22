import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@env/version';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public version = AppVersion.Version;
  public data = AppVersion.Date;
  constructor() {}

  ngOnInit() {}
}
