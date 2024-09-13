import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu-reporting-bi',
  templateUrl: './menu-reporting-bi.component.html',
  styleUrls: ['./menu-reporting-bi.component.css']
})
export class MenuReportingBiComponent implements OnInit {

  @Input() is_modal: boolean = false;
  itensMenu: any[]
  title: ''
  constructor() { }

  ngOnInit(): void {
  }
  MenuReporting(event) {
    this.title = event.title
    this.itensMenu = event.itensMenu
  }

}
