import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-table-list',
  templateUrl: './generic-table-list.component.html',
  styleUrls: ['./generic-table-list.component.css'],
})
export class GenericTableListComponent implements OnInit {
  actions: any = [
    {
      name: 'Editar',
      url: '/editar',
      icon: 'fa fa-edit',
    },
    {
      name: 'Excluir',
      url: '/excluir',
      icon: 'fa fa-edit',
    },
  ];

  @Input() fields = [];
  @Input() data: Array<any> = [];

  keys: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    this.keys = Object.keys(this.data[0]) || [];
    // console.log("keys=>", this.keys)
  }
}
