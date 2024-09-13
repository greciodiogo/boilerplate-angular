import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  @Input() fields = [];

  @Input() items: any = [];

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

  constructor() {}

  ngOnInit(): void {}
}
