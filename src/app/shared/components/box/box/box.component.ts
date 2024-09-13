import { Component, Input, OnInit } from '@angular/core';
import { FnService } from '@app/shared/services/fn.helper.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() boxLink = {
    url: null,
    name: '',
    permission: true
  };

  @Input() boxIcon: string;
  @Input() boxText: string = 'FFFFFFFFFFF';
  @Input() boxNumber: number = 0;
  @Input() boxColor: string = 'bg-aqua';
  @Input() loading:boolean = true;
  @Input() extraText:string = null;
  @Input() linkTextAlign:string='text-center'

  animation = 'pulse';

  constructor(public fnService: FnService) {}

  ngOnInit(): void {
  }
}
