import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FnService } from '@app/shared/services/fn.helper.service';

@Component({
  selector: 'table-select-column',
  templateUrl: './table-select-column.component.html',
  styleUrls: ['./table-select-column.component.css']
})
export class TableSelectColumnComponent implements OnInit {

  @Input() tableId: string;;
  @Input() columnsDefault: string[] = [];
  @Output() public action = new EventEmitter<any>();

  columns = [];
  constructor(private fnService: FnService) { }

  ngOnInit(): void {
    this.columns =  this.getColumns(this.columnsDefault);
  }

  onClickHandlerCheckbox(c){
    if(c.checked){
      c.checked = false;
        // $(`${this.tableId} tr > :nth-child(${c.index+1})`).hide();
        removeColumnTable(c.index + 1, this.tableId);
    }else{
      c.checked = true;
      // $(`${this.tableId} tr > :nth-child(${c.index+1})`).show();
      addColumnTable(c.index+1, this.tableId)
    }
    this.columns = this.fnService.deleteElementRow(this.columns, 'index', c.index);
    this.columns.push(c);
    this.columns =  this.columns.sort((p1, p2) => (p1.index > p2.index) ? 1 : (p1.index < p2.index) ? -1 : 0);
    this.action.emit(c);
  }

 /**
   *
   * @param columsChecked
   * @param tableId
   * @returns
   */
 public getColumns(columsChecked = []) {
  var columns: any = [];
  $(`${this.tableId} thead tr th`).each(function (i, linha) {
    const column = {
      index: i,
      nameColumn: linha.innerHTML,
      checked: columsChecked.length == 0 ? true : false,
    };
    for (let i = 0; i < columsChecked.length; i++) {
      const nameColumn = columsChecked[i];
      if (nameColumn == column.nameColumn) {
        column.checked = true;
      }
    }
    columns.push(column);
  });
  for (let idx = 0; idx < columns.length; idx++) {
    const column = columns[idx];
    if (!column.checked) {
      removeColumnTable(idx + 1, this.tableId);
    }
  }
  return columns;
}

// get columns() {
//   return this.getColumns(this.columsChecked);
// }

}

function removeColumnTable(idx: number, tableId: string) {
$(`${tableId} tr > :nth-child(${idx})`).hide();
}

function addColumnTable(idx: number, tableId: string) {
$(`${tableId} tr > :nth-child(${idx})`).show();
}
