import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-row-skeleton',
  templateUrl: './table-row-skeleton.component.html',
  styleUrls: ['./table-row-skeleton.component.css'],
})
export class TableRowSkeletonComponent implements OnInit {
  @Input() cols: number;
  @Input() rows: number;
  @Input() loading: true;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.cols)
  }
}
