import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '@app/shared/models/pagination';
import { ButtonSettings, ColumnSetting } from './model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() settings: ColumnSetting[] = [];
  @Input() buttons: ButtonSettings[] = [];

  @Input() pagination: Pagination = new Pagination()
  @Input() loading:boolean = false;

  columnMaps: ColumnSetting[] = [];
  buttonHeader: string = '';


  constructor() {}

  ngOnInit(): void {
    if (!this.buttons) this.buttons = [];

    this.buttons.length > 1
      ? (this.buttonHeader = 'Actions')
      : (this.buttonHeader = 'Action');

    if (this.settings) {
      this.columnMaps = this.settings;
    } else {
      this.columnMaps = Object.keys(this.data[0]).map((key) => {
        return {
          primaryKey: key,
          header:
            key.slice(0, 1).toUpperCase() + key.replace(/_/g, ' ').slice(1),
          format: 0,
        };
      });
    }
  }

  bc(record: any, func: any, values: any) {
    func(...values.map((val: any) => record[val]));
  }

  getKeyObject(val, key): string {
    let arrEstado = ["Activo", "Processado", "Fechado"]
    const {primaryKey, property} = key;
    if(primaryKey && primaryKey === "in_sap"){
      return arrEstado[val];
    }
    if (val && typeof val === 'object') {
      return val[property];
    }
    return val;
  }

  getState(value): string {
    // console.log("value=>",value, " type = ",typeof value);
    return value === 1 ? "Sim": value ===0 ? "Não" : value;
  }

}
