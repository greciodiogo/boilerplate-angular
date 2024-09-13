import { Component, Input, OnInit } from '@angular/core';

export interface ActionInterface {
  name: string;
  url: string;
  icon?: string;
  modal?: string;
  fn?: [];
}

@Component({
  selector: 'table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css'],
})
export class TableActionsComponent implements OnInit {
  @Input() actions: ActionInterface[];

  constructor() {}

  ngOnInit(): void {
    // console.log(this.actions);
  }

  fn() {}
}
