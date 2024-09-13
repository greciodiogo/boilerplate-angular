import { Component, OnInit } from '@angular/core';
import { FnService } from '@shared/services/fn.helper.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  public message = null;
  public show = false;
  public classDiv = null;
  public classInfo = null;
  public textAlert = null;

  constructor(private config: FnService) {}

  ngOnInit() {
    this.config.alertEvent.subscribe(res=> {
      this.showAlert(res);
    });
  }

  public showAlert(objecto) {
    this.message = objecto?.message;
    this.classDiv = objecto?.classDiv;
    this.classInfo = objecto?.classInfo;
    this.textAlert = objecto?.textAlert;
    this.show =objecto?.show;

    setTimeout(() => {
      this.show = false;
    }, 25000);
  }
}
