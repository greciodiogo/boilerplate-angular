import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  @Input() boxIcon: string;
  @Input() boxText: string = 'Default Text';
  @Input() boxNumber: number = 0;
  @Input() boxColor: string = "red";
  @Input() loading:boolean = false;
  @Input() extraText:string = null;
  @Input() linkTextAlign:string='text-center';

  constructor() { }

  ngOnInit(): void {
  }

}
